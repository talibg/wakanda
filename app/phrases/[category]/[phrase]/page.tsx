import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { findPhraseCategory, phraseCategories } from '@/app/data/phrases'
import { findWordCategory } from '@/app/data/words'
import { JsonLdBreadcrumb } from '@/components/json-ld'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDialectSnippet } from '@/lib/english-to-wolof-snippet'
import {
    getCanonicalPhraseLeafPath,
    getCanonicalPhraseLeafPathForPhrase,
    isCanonicalPhraseLeafOwner
} from '@/lib/phrase-seo'
import { buildCanonicalUrl } from '@/lib/seo'
import { slugifyEnglish } from '@/lib/slugify'
import type { PhraseCategory as PhraseCategorySlug, WolofPhrase, WordCategory as WordCategorySlug } from '@/data/types'

export const dynamic = 'force-static'

type PageParams = {
    params: Promise<{
        category: string
        phrase: string
    }>
}

const fallbackMetadata: Metadata = {
    title: 'Wolof Phrase',
    description: 'Learn a Wolof phrase with Senegalese and Gambian spellings.',
    alternates: {
        canonical: buildCanonicalUrl('/phrases')
    }
}

export const generateStaticParams = () => {
    const params: Array<{ category: string; phrase: string }> = []
    const seen = new Set<string>()

    for (const category of phraseCategories) {
        for (const phrase of category.items) {
            if (!isCanonicalPhraseLeafOwner(phrase)) continue
            const slug = slugifyEnglish(phrase.english)
            const key = `${category.slug}/${slug}`
            if (seen.has(key)) continue
            seen.add(key)
            params.push({ category: category.slug, phrase: slug })
        }
    }

    return params
}

export const generateMetadata = async ({ params }: PageParams): Promise<Metadata> => {
    const { category, phrase } = await params
    const descriptor = findPhraseCategory(category)
    const canonicalPath = getCanonicalPhraseLeafPath({ category, slug: phrase })

    if (!descriptor) {
        return fallbackMetadata
    }

    const phraseItem = descriptor.items.find((item) => slugifyEnglish(item.english) === phrase)

    if (!phraseItem) {
        return fallbackMetadata
    }

    const translation = formatDialectSnippet(phraseItem)
    const title = `${phraseItem.english} in Wolof — ${translation}`
    const description = `How to say "${phraseItem.english}" in Wolof: ${translation}. Dialect-aware spellings for Senegal and The Gambia.`
    const url = buildCanonicalUrl(canonicalPath ?? `/phrases/${descriptor.slug}/${phrase}`)

    return {
        title,
        description,
        alternates: {
            canonical: url
        },
        openGraph: {
            title: `${title} | Learn Wolof`,
            description,
            url,
            type: 'website',
            images: [
                {
                    url: 'https://learnwolof.com/og-learn-wolof.png',
                    width: 1200,
                    height: 630,
                    alt: 'Learn Wolof words and phrases from Senegal and The Gambia'
                }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title: `${title} | Learn Wolof`,
            description,
            images: ['https://learnwolof.com/og-learn-wolof.png']
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1
            }
        }
    }
}

const relatedWordCategories: Partial<Record<PhraseCategorySlug, WordCategorySlug[]>> = {
    greetings: ['core', 'time', 'descriptors'],
    'polite-expressions': ['core', 'descriptors'],
    introductions: ['core', 'family', 'actions'],
    farewells: ['time', 'core'],
    everyday: ['core', 'actions', 'descriptors', 'time'],
    questions: ['core', 'actions', 'places', 'numbers'],
    travel: ['places', 'actions', 'numbers', 'time', 'descriptors'],
    market: ['numbers', 'food', 'actions', 'places'],
    dining: ['food', 'actions', 'descriptors', 'numbers'],
    health: ['places', 'actions', 'core', 'descriptors'],
    family: ['family', 'core', 'descriptors'],
    romance: ['family', 'core', 'descriptors']
}

const pickRelatedPhrases = (phrases: WolofPhrase[], current: WolofPhrase) => {
    const currentTags = new Set(current.tags ?? [])

    const scored = phrases
        .filter((phrase) => phrase.id !== current.id)
        .map((phrase) => {
            const score = (phrase.tags ?? []).reduce((total, tag) => (currentTags.has(tag) ? total + 1 : total), 0)
            return { phrase, score }
        })
        .sort((left, right) => {
            if (left.score !== right.score) return right.score - left.score
            return left.phrase.english.localeCompare(right.phrase.english)
        })

    return scored.slice(0, 5).map((entry) => entry.phrase)
}

const PhraseDetailPage = async ({ params }: PageParams) => {
    const { category, phrase } = await params
    const descriptor = findPhraseCategory(category)

    if (!descriptor) {
        notFound()
    }

    const phraseItem = descriptor.items.find((item) => slugifyEnglish(item.english) === phrase)

    if (!phraseItem) {
        notFound()
    }

    const translation = formatDialectSnippet(phraseItem)
    const translateSlug = slugifyEnglish(phraseItem.english)
    const canonicalPhraseHref = getCanonicalPhraseLeafPathForPhrase(phraseItem)
    const relatedPhrases = pickRelatedPhrases(descriptor.items, phraseItem).slice(0, 5)
    const wordCategorySlugs = relatedWordCategories[descriptor.slug] ?? ['core', 'actions']
    const uniqueWordCategorySlugs = Array.from(new Set(wordCategorySlugs)).slice(0, 10)

    return (
        <div className="space-y-8">
            <JsonLdBreadcrumb
                items={[
                    { name: 'Home', item: '/' },
                    { name: 'Phrases', item: '/phrases' },
                    { name: descriptor.title, item: `/phrases/${descriptor.slug}` },
                    { name: phraseItem.english, item: canonicalPhraseHref }
                ]}
            />

            <header className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Phrase</p>
                <h1 className="text-3xl font-bold tracking-tight">{phraseItem.english}</h1>
                <p className="text-muted-foreground">Wolof translation: {translation}</p>
                {phraseItem.tags?.length ? (
                    <div className="flex flex-wrap gap-2 pt-1">
                        {phraseItem.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                ) : null}
            </header>

            <section className="grid gap-4 sm:grid-cols-2">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">Senegal</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-xl font-semibold text-primary">{phraseItem.senegal}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">Gambia</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-xl font-semibold text-primary">{phraseItem.gambia}</p>
                    </CardContent>
                </Card>
            </section>

            <section className="border-t pt-8 space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Related phrases</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {relatedPhrases.map((related) => {
                        const relatedTranslation = formatDialectSnippet(related)
                        const relatedHref = getCanonicalPhraseLeafPathForPhrase(related)

                        return (
                            <Link
                                className="group block rounded-lg border p-4 transition-colors hover:bg-muted/50"
                                href={relatedHref}
                                key={`${related.id}-${relatedHref}`}
                            >
                                <h3 className="font-semibold group-hover:text-primary">{related.english}</h3>
                                <p className="mt-1 text-sm text-muted-foreground">{relatedTranslation}</p>
                            </Link>
                        )
                    })}
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Related vocabulary</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {uniqueWordCategorySlugs.flatMap((slug) => {
                        const wordCategory = findWordCategory(slug)
                        if (!wordCategory) return []

                        return [
                            <Link
                                className="group block rounded-lg border p-4 transition-colors hover:bg-muted/50"
                                href={`/words/${wordCategory.slug}`}
                                key={wordCategory.slug}
                            >
                                <h3 className="font-semibold group-hover:text-primary">{wordCategory.title}</h3>
                                <p className="text-sm text-muted-foreground">{wordCategory.description}</p>
                            </Link>
                        ]
                    })}
                </div>
            </section>

            {phraseItem.notes ? (
                <section className="rounded-2xl border bg-card p-6">
                    <h2 className="text-lg font-semibold">Usage note</h2>
                    <p className="mt-2 text-muted-foreground">{phraseItem.notes}</p>
                </section>
            ) : null}

            <section className="flex flex-wrap gap-3 border-t pt-8">
                <Button asChild variant="default">
                    <Link href={`/translate/english-to-wolof/${encodeURIComponent(translateSlug)}`}>Open translator</Link>
                </Button>
                <Button asChild variant="secondary">
                    <Link href={`/phrases/${descriptor.slug}`}>Back to {descriptor.title}</Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href="/phrases">All phrase categories</Link>
                </Button>
            </section>
        </div>
    )
}

export default PhraseDetailPage
