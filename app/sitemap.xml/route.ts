import { phraseCategories, wordCategories } from '@/data/index'

const siteUrl = 'https://learnwolof.com'

type SitemapEntry = {
    path: string
    priority: string
}

const baseEntries: SitemapEntry[] = [
    { path: '/', priority: '1.0' },
    { path: '/words', priority: '0.9' },
    { path: '/phrases', priority: '0.9' },
]

const buildCategoryEntries = () => {
    const wordEntries = wordCategories.map((category) => ({
        path: `/words/${category.id}`,
        priority: '0.8',
    }))

    const phraseEntries = phraseCategories.map((category) => ({
        path: `/phrases/${category.id}`,
        priority: '0.8',
    }))

    return [...wordEntries, ...phraseEntries]
}

export function GET() {
    const allEntries = [...baseEntries, ...buildCategoryEntries()]

    const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allEntries
    .map(
        (entry) => `<url>
  <loc>${siteUrl}${entry.path}</loc>
  <changefreq>weekly</changefreq>
  <priority>${entry.priority}</priority>
</url>`,
    )
    .join('\n')}
</urlset>`

    return new Response(body, {
        headers: {
            'Content-Type': 'application/xml',
        },
    })
}
