import type { MetadataRoute } from 'next'

import { phraseCategories } from '@/app/data/phrases'
import { wordCategories } from '@/app/data/words'
import { isCanonicalPhraseLeafOwner } from '@/lib/phrase-seo'
import { slugifyEnglish } from '@/lib/slugify'

const siteUrl = 'https://learnwolof.com'

const buildUrl = (path: string) => `${siteUrl}${path}`

const allowedPhraseCategories = new Set([
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
])

const allowedWordCategories = new Set([
    'core',
    'actions',
    'descriptors',
    'numbers',
    'family',
    'food',
    'time',
    'places'
])

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date()

    const baseRoutes: MetadataRoute.Sitemap = [
        { url: buildUrl('/'), lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
        { url: buildUrl('/phrases'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
        { url: buildUrl('/words'), lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
        { url: buildUrl('/privacy'), lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
        { url: buildUrl('/terms'), lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
        { url: buildUrl('/contact'), lastModified: now, changeFrequency: 'monthly', priority: 0.3 }
    ]

    const wordRoutes: MetadataRoute.Sitemap = wordCategories
        .filter((category) => allowedWordCategories.has(category.slug))
        .map((category) => ({
            url: buildUrl(`/words/${category.slug}`),
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.7
        }))

    const phraseHubRoutes: MetadataRoute.Sitemap = phraseCategories
        .filter((category) => allowedPhraseCategories.has(category.slug))
        .map((category) => ({
            url: buildUrl(`/phrases/${category.slug}`),
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.9
        }))

    const phraseDetailRoutes: MetadataRoute.Sitemap = phraseCategories
        .filter((category) => allowedPhraseCategories.has(category.slug))
        .flatMap((category) => {
            const seen = new Set<string>()
            return category.items.flatMap((phrase) => {
                if (!isCanonicalPhraseLeafOwner(phrase)) return []

                const slug = slugifyEnglish(phrase.english)
                const key = `${category.slug}/${slug}`
                if (seen.has(key)) return []
                seen.add(key)

                return [
                    {
                        url: buildUrl(`/phrases/${category.slug}/${slug}`),
                        lastModified: now,
                        changeFrequency: 'weekly' as const,
                        priority: 0.6
                    }
                ]
            })
        })

    return [...baseRoutes, ...phraseHubRoutes, ...phraseDetailRoutes, ...wordRoutes]
}
