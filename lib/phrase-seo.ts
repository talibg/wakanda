import { phraseCategories } from '@/app/data/phrases'
import type { PhraseCategory as PhraseCategorySlug, WolofPhrase } from '@/data/types'
import { slugifyEnglish } from '@/lib/slugify'

export type PhraseLeafOwner = {
    category: PhraseCategorySlug
    slug: string
    phrase: WolofPhrase
}

export type PhraseLeafTarget = {
    category: PhraseCategorySlug
    slug: string
}

const stripDiacritics = (value: string) => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '')

const normalizeLoose = (value: string) => {
    const trimmed = value.trim()
    if (!trimmed) return ''

    const withoutDiacritics = stripDiacritics(trimmed)
    const lower = withoutDiacritics.toLowerCase()
    const withoutApostrophes = lower.replace(/[’']/g, '')
    const wordsOnly = withoutApostrophes.replace(/[^a-z0-9]+/g, ' ')

    return wordsOnly.replace(/\s+/g, ' ').trim()
}

const phraseSlugAliasesByCategory: Partial<Record<PhraseCategorySlug, Record<string, string>>> = {
    everyday: {
        'i-do-not-understand': 'i-dont-understand'
    }
}

const phraseSlugAliasTargets = new Map<string, string>()

for (const aliases of Object.values(phraseSlugAliasesByCategory)) {
    if (!aliases) continue

    for (const [aliasSlug, canonicalSlug] of Object.entries(aliases)) {
        const existing = phraseSlugAliasTargets.get(aliasSlug)
        if (!existing) {
            phraseSlugAliasTargets.set(aliasSlug, canonicalSlug)
            continue
        }

        if (existing === canonicalSlug) continue
    }
}

const resolvePhraseSlugAlias = (slug: string) => phraseSlugAliasTargets.get(slug) ?? slug

const forcedOwnerByPhraseSlug: Partial<Record<string, PhraseCategorySlug>> = {
    'see-you-later': 'farewells',
    'do-you-speak-english': 'introductions',
    'i-am-tired': 'health',
    'i-am-hungry': 'dining'
}

const phraseCategoryPriority: PhraseCategorySlug[] = [
    'polite-expressions',
    'introductions',
    'farewells',
    'greetings',
    'travel',
    'market',
    'dining',
    'health',
    'family',
    'questions',
    'everyday',
    'romance'
]

const priorityIndex = new Map<PhraseCategorySlug, number>(
    phraseCategoryPriority.map((slug, index) => [slug, index])
)

const getPriority = (category: PhraseCategorySlug) => priorityIndex.get(category) ?? phraseCategoryPriority.length

const pickBestOwner = (matches: PhraseLeafOwner[], slug: string) => {
    const forcedOwner = forcedOwnerByPhraseSlug[slug]
    if (forcedOwner) {
        const forcedMatch = matches.find((match) => match.category === forcedOwner)
        if (forcedMatch) return forcedMatch
    }

    let best: PhraseLeafOwner | undefined
    let bestPriority = Number.POSITIVE_INFINITY

    for (const match of matches) {
        const priority = getPriority(match.category)
        if (priority >= bestPriority) continue
        best = match
        bestPriority = priority
    }

    return best
}

const phraseOwnersBySlug = new Map<string, PhraseLeafOwner[]>()

for (const category of phraseCategories) {
    for (const phrase of category.items) {
        const slug = slugifyEnglish(phrase.english)
        const aliasTarget = phraseSlugAliasesByCategory[category.slug]?.[slug]
        if (aliasTarget) continue
        const entries = phraseOwnersBySlug.get(slug) ?? []
        entries.push({ category: category.slug, slug, phrase })
        phraseOwnersBySlug.set(slug, entries)
    }
}

const findOwnerBySlug = (slug: string) => {
    const resolvedSlug = resolvePhraseSlugAlias(slug)
    const matches = phraseOwnersBySlug.get(resolvedSlug)
    if (!matches?.length) return undefined
    return pickBestOwner(matches, resolvedSlug)
}

export const getCanonicalPhraseLeafTarget = ({
    category,
    slug
}: {
    category: string
    slug: string
}): PhraseLeafTarget | null => {
    const descriptor = phraseCategories.find((phraseCategory) => phraseCategory.slug === category)
    if (!descriptor) return null

    const aliasTarget = phraseSlugAliasesByCategory[descriptor.slug]?.[slug]
    const resolvedSlug = aliasTarget ?? slug

    const hasRequested = descriptor.items.some((phrase) => slugifyEnglish(phrase.english) === slug)
    const hasResolved = descriptor.items.some((phrase) => slugifyEnglish(phrase.english) === resolvedSlug)

    if (!hasRequested && !hasResolved) return null

    const owner = findOwnerBySlug(resolvedSlug)
    if (!owner) return { category: descriptor.slug, slug: resolvedSlug }

    return { category: owner.category, slug: owner.slug }
}

export const getCanonicalPhraseLeafPath = ({ category, slug }: { category: string; slug: string }) => {
    const target = getCanonicalPhraseLeafTarget({ category, slug })
    if (!target) return null
    return `/phrases/${target.category}/${target.slug}`
}

export const getCanonicalPhraseLeafPathForPhrase = (phrase: WolofPhrase) => {
    const phraseSlug = slugifyEnglish(phrase.english)
    const aliasTarget = phraseSlugAliasesByCategory[phrase.category]?.[phraseSlug]
    const resolvedSlug = aliasTarget ?? phraseSlug

    const owner = findOwnerBySlug(resolvedSlug)
    if (!owner) return `/phrases/${phrase.category}/${resolvedSlug}`

    return `/phrases/${owner.category}/${owner.slug}`
}

export const isCanonicalPhraseLeafOwner = (phrase: WolofPhrase) => {
    const phraseSlug = slugifyEnglish(phrase.english)
    const aliasTarget = phraseSlugAliasesByCategory[phrase.category]?.[phraseSlug]
    if (aliasTarget) return false

    const owner = findOwnerBySlug(phraseSlug)
    if (!owner) return true

    return owner.category === phrase.category
}

export const findPhraseLeafByEnglishTerm = (english: string): PhraseLeafOwner | undefined => {
    const englishSlug = slugifyEnglish(english)
    return findOwnerBySlug(englishSlug)
}

export const findPhraseLeafByWolofTerm = (wolof: string): PhraseLeafOwner | undefined => {
    const normalizedTerm = normalizeLoose(wolof)
    if (!normalizedTerm) return undefined

    const owners = new Map<string, PhraseLeafOwner>()

    for (const category of phraseCategories) {
        for (const phrase of category.items) {
            const senegal = normalizeLoose(phrase.senegal)
            const gambia = normalizeLoose(phrase.gambia)

            if (senegal !== normalizedTerm && gambia !== normalizedTerm) continue

            const slug = slugifyEnglish(phrase.english)
            const owner = findOwnerBySlug(slug)
            if (!owner) continue

            const key = `${owner.category}/${owner.slug}`
            if (owners.has(key)) continue
            owners.set(key, owner)
        }
    }

    if (!owners.size) return undefined

    const sorted = Array.from(owners.values()).sort(
        (left, right) => getPriority(left.category) - getPriority(right.category)
    )

    return sorted[0]
}

const preferredHubOrder: PhraseCategorySlug[] = [
    'greetings',
    'polite-expressions',
    'introductions',
    'farewells',
    'everyday',
    'questions',
    'travel',
    'market',
    'health',
    'dining',
    'family'
]

const preferredHubSet = new Set<PhraseCategorySlug>(preferredHubOrder)

const intersectCount = (left: Set<string>, right: string[]) => {
    let count = 0
    for (const token of right) {
        if (!left.has(token)) continue
        count += 1
    }
    return count
}

export const findClosestPhraseHub = ({
    direction,
    term
}: {
    direction: 'english' | 'wolof'
    term: string
}): PhraseCategorySlug => {
    const tokens = normalizeLoose(term).split(' ').filter(Boolean)
    if (!tokens.length) return 'everyday'

    const tokenSet = new Set(tokens)

    let best: { slug: PhraseCategorySlug; score: number } | undefined

    for (const category of phraseCategories) {
        if (!preferredHubSet.has(category.slug)) continue

        let score = 0

        for (const phrase of category.items) {
            const haystacks =
                direction === 'english' ? [phrase.english] : [phrase.senegal, phrase.gambia].filter(Boolean)

            for (const haystack of haystacks) {
                const hayTokens = normalizeLoose(haystack).split(' ').filter(Boolean)
                score = Math.max(score, intersectCount(tokenSet, hayTokens))
            }

            if (score === tokenSet.size) break
        }

        if (!best) {
            best = { slug: category.slug, score }
            continue
        }

        if (score > best.score) {
            best = { slug: category.slug, score }
            continue
        }

        if (score !== best.score) continue

        const currentIndex = preferredHubOrder.indexOf(category.slug)
        const bestIndex = preferredHubOrder.indexOf(best.slug)

        if (currentIndex !== -1 && bestIndex !== -1 && currentIndex < bestIndex) {
            best = { slug: category.slug, score }
        }
    }

    if (!best) return 'everyday'
    if (best.score === 0) return 'everyday'

    return best.slug
}
