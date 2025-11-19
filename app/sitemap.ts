import type { MetadataRoute } from 'next'

import { phraseCategories, wordCategories } from '@/data/index'

const siteUrl = 'https://learnwolof.com'

const buildUrl = (path: string) => `${siteUrl}${path}`

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date()

    const baseRoutes: MetadataRoute.Sitemap = [
        { url: buildUrl('/'), lastModified: now, changeFrequency: 'weekly', priority: 1 },
        { url: buildUrl('/alphabet'), lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
        { url: buildUrl('/words'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
        { url: buildUrl('/phrases'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    ]

    const wordRoutes: MetadataRoute.Sitemap = wordCategories.map((category) => ({
        url: buildUrl(`/words/${category.id}`),
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
    }))

    const phraseRoutes: MetadataRoute.Sitemap = phraseCategories.map((category) => ({
        url: buildUrl(`/phrases/${category.id}`),
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
    }))

    return [...baseRoutes, ...wordRoutes, ...phraseRoutes]
}
