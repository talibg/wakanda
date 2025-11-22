import type { MetadataRoute } from 'next'

import { phraseCategories } from '@/app/data/phrases'
import { wordCategories } from '@/app/data/words'

const siteUrl = 'https://learnwolof.com'

const buildUrl = (path: string) => `${siteUrl}${path}`

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date()

    const baseRoutes: MetadataRoute.Sitemap = [
        { url: buildUrl('/'), lastModified: now, changeFrequency: 'weekly', priority: 1 },
        { url: buildUrl('/alphabet'), lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
        { url: buildUrl('/words'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
        { url: buildUrl('/phrases'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
        { url: buildUrl('/privacy'), lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
        { url: buildUrl('/terms'), lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
        { url: buildUrl('/contact'), lastModified: now, changeFrequency: 'monthly', priority: 0.5 }
    ]

    const wordRoutes: MetadataRoute.Sitemap = wordCategories.map(category => ({
        url: buildUrl(`/words/${category.slug}`),
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8
    }))

    const phraseRoutes: MetadataRoute.Sitemap = phraseCategories.map(category => ({
        url: buildUrl(`/phrases/${category.slug}`),
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8
    }))

    const guideRoutes: MetadataRoute.Sitemap = [
        {
            url: buildUrl('/phrases/romance'),
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.7
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

    return [...baseRoutes, ...wordRoutes, ...phraseRoutes, ...guideRoutes]
}
