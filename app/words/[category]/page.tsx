import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { JsonLdBreadcrumb, JsonLdCollectionPage } from '@/components/json-ld'
import { WordCategoryBrowser } from '@/components/word-category-browser'
import { getWordsByCategory, wordCategories } from '@/data/index'
import type { WordCategory } from '@/data/types'
import { buildCanonicalUrl } from '@/lib/seo'

export const dynamic = 'force-dynamic'

const categoryMap = new Map(wordCategories.map((category) => [category.id, category]))

const isWordCategory = (value: string): value is WordCategory => categoryMap.has(value as WordCategory)

type PageParams = {
    params: Promise<{
        category: string
    }>
}

export const generateMetadata = async ({ params }: PageParams): Promise<Metadata> => {
    const { category } = await params

    if (!isWordCategory(category)) {
        return {
            title: 'Wolof Vocabulary',
            description: 'Detailed Wolof vocabulary lessons for Senegal and The Gambia.',
            alternates: {
                canonical: buildCanonicalUrl('/words'),
            },
        }
    }

    const descriptor = categoryMap.get(category)
    if (!descriptor) {
        return {
            title: 'Wolof Vocabulary',
            description: 'Detailed Wolof vocabulary lessons for Senegal and The Gambia.',
            alternates: {
                canonical: buildCanonicalUrl('/words'),
            },
        }
    }

    const title = `${descriptor.label} Wolof Vocabulary`
    const description = `Learn Wolof ${descriptor.label.toLowerCase()} with authentic Senegalese and Gambian spellings, example sentences, and pronunciation notes.`
    const url = buildCanonicalUrl(`/words/${descriptor.id}`)

    return {
        title,
        description,
        alternates: {
            canonical: url,
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
                    alt: 'Learn Wolof words and phrases from Senegal and The Gambia',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${title} | Learn Wolof`,
            description,
            images: ['https://learnwolof.com/og-learn-wolof.png'],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    }
}

export default async function WordCategoryPage({ params }: PageParams) {
    const { category } = await params
    if (!isWordCategory(category)) {
        notFound()
    }

    const descriptor = categoryMap.get(category)
    if (!descriptor) {
        notFound()
    }

    const words = getWordsByCategory(descriptor.id)

    return (
        <div className="space-y-8">
            <JsonLdBreadcrumb
                items={[
                    { name: 'Home', item: '/' },
                    { name: 'Words', item: '/words' },
                    { name: descriptor.label, item: `/words/${descriptor.id}` },
                ]}
            />
            <JsonLdCollectionPage
                description={descriptor.description}
                items={words.map((word) => ({
                    name: word.english,
                    description: `Wolof translation for ${word.english}: ${word.senegal} (Senegal), ${word.gambia} (Gambia)`,
                    url: `https://learnwolof.com/words/${descriptor.id}?q=${encodeURIComponent(word.english)}`,
                }))}
                name={`Wolof ${descriptor.label}`}
                url={`https://learnwolof.com/words/${descriptor.id}`}
            />
            <header className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Vocabulary</p>
                <h1 className="text-3xl font-bold tracking-tight">{descriptor.label}</h1>
                <p className="text-muted-foreground">
                    {descriptor.description} Compare how Wolof is written in Dakar versus Banjul, then use the search
                    bar to find the words you need right away.
                </p>
            </header>
            <WordCategoryBrowser words={words} />

            <section className="border-t pt-8">
                <h2 className="mb-6 text-2xl font-bold">Related Categories</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {wordCategories
                        .filter((c) => c.id !== descriptor.id)
                        .map((category) => (
                            <Link
                                className="group block rounded-lg border p-4 transition-colors hover:bg-muted/50"
                                href={`/words/${category.id}`}
                                key={category.id}
                            >
                                <h3 className="font-semibold group-hover:text-primary">{category.label}</h3>
                                <p className="text-sm text-muted-foreground">{category.description}</p>
                            </Link>
                        ))}
                </div>
            </section>
        </div>
    )
}
