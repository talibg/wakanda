import type { MetadataRoute } from 'next'

import { phraseCategories } from '@/app/data/phrases'
import { wordCategories } from '@/app/data/words'
import { englishToWolofExamples, wolofToEnglishExamples } from '@/data/translate-examples'
import { slugifyEnglish } from '@/lib/slugify'

const siteUrl = 'https://learnwolof.com'

const buildUrl = (path: string) => `${siteUrl}${path}`
const slugifyTerm = (term: string) => term.trim().toLowerCase().replace(/\s+/g, '-')

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date()

    const baseRoutes: MetadataRoute.Sitemap = [
        { url: buildUrl('/'), lastModified: now, changeFrequency: 'weekly', priority: 1 },
        { url: buildUrl('/alphabet'), lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
        { url: buildUrl('/guides'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
        { url: buildUrl('/words'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
        { url: buildUrl('/phrases'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
        { url: buildUrl('/privacy'), lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
        { url: buildUrl('/terms'), lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
        { url: buildUrl('/contact'), lastModified: now, changeFrequency: 'monthly', priority: 0.5 }
    ]

    const wordRoutes: MetadataRoute.Sitemap = wordCategories.map((category) => ({
        url: buildUrl(`/words/${category.slug}`),
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8
    }))

    const phraseRoutes: MetadataRoute.Sitemap = phraseCategories.map((category) => ({
        url: buildUrl(`/phrases/${category.slug}`),
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8
    }))

    const phraseDetailRoutes: MetadataRoute.Sitemap = phraseCategories.flatMap((category) => {
        const seen = new Set<string>()
        return category.items.flatMap((phrase) => {
            const slug = slugifyEnglish(phrase.english)
            const key = `${category.slug}/${slug}`
            if (seen.has(key)) return []
            seen.add(key)
            return [
                {
                    url: buildUrl(`/phrases/${category.slug}/${slug}`),
                    lastModified: now,
                    changeFrequency: 'weekly' as const,
                    priority: 0.7
                }
            ]
        })
    })

    const guideRoutes: MetadataRoute.Sitemap = [
        {
            url: buildUrl('/guides/wolof-greetings-and-polite-phrases'),
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.9
        },
        {
            url: buildUrl('/guides/first-ten-wolof-phrases'),
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.9
        },
        {
            url: buildUrl('/guides/wolof-travel-survival-guide'),
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.9
        }
    ]

    const translateBase: MetadataRoute.Sitemap = [
        { url: buildUrl('/translate'), lastModified: now, changeFrequency: 'daily' as const, priority: 0.95 },
        {
            url: buildUrl('/translate/english-to-wolof'),
            lastModified: now,
            changeFrequency: 'daily' as const,
            priority: 0.9
        },
        {
            url: buildUrl('/translate/wolof-to-english'),
            lastModified: now,
            changeFrequency: 'daily' as const,
            priority: 0.9
        }
    ]

    const translateExamples: MetadataRoute.Sitemap = [
        ...englishToWolofExamples.map((term) => ({
            url: buildUrl(`/translate/english-to-wolof/${encodeURIComponent(slugifyTerm(term))}`),
            lastModified: now,
            changeFrequency: 'weekly' as const,
            priority: 0.8
        })),
        ...wolofToEnglishExamples.map((term) => ({
            url: buildUrl(`/translate/wolof-to-english/${encodeURIComponent(slugifyTerm(term))}`),
            lastModified: now,
            changeFrequency: 'weekly' as const,
            priority: 0.8
        }))
    ]

    return [
        ...baseRoutes,
        ...wordRoutes,
        ...phraseRoutes,
        ...phraseDetailRoutes,
        ...guideRoutes,
        ...translateBase,
        ...translateExamples
    ]
}
