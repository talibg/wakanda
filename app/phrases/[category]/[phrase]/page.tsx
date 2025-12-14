import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { findPhraseCategory, phraseCategories } from '@/app/data/phrases'
import { JsonLdBreadcrumb } from '@/components/json-ld'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDialectSnippet } from '@/lib/english-to-wolof-snippet'
import { buildCanonicalUrl } from '@/lib/seo'
import { slugifyEnglish } from '@/lib/slugify'

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
    const url = buildCanonicalUrl(`/phrases/${descriptor.slug}/${phrase}`)

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

    return (
        <div className="space-y-8">
            <JsonLdBreadcrumb
                items={[
                    { name: 'Home', item: '/' },
                    { name: 'Phrases', item: '/phrases' },
                    { name: descriptor.title, item: `/phrases/${descriptor.slug}` },
                    { name: phraseItem.english, item: `/phrases/${descriptor.slug}/${phrase}` }
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

