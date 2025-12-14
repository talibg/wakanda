import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { findPhraseCategory } from '@/app/data/phrases'
import { findWordCategory, wordCategories } from '@/app/data/words'
import { JsonLdBreadcrumb, JsonLdCollectionPage } from '@/components/json-ld'
import { WordCategoryBrowser } from '@/components/word-category-browser'
import { buildCanonicalUrl } from '@/lib/seo'
import type { PhraseCategory as PhraseCategorySlug, WordCategory as WordCategorySlug } from '@/data/types'

export const dynamic = 'force-static'

type PageParams = {
    params: Promise<{
        category: string
    }>
}

const fallbackMetadata: Metadata = {
    title: 'Wolof Vocabulary',
    description: 'Detailed Wolof vocabulary lessons for Senegal and The Gambia.',
    alternates: {
        canonical: buildCanonicalUrl('/words')
    }
}

export const generateStaticParams = () => {
    return wordCategories.map((category) => ({ category: category.slug }))
}

export const generateMetadata = async ({ params }: PageParams): Promise<Metadata> => {
    const { category } = await params
    const descriptor = findWordCategory(category)

    if (!descriptor) {
        return fallbackMetadata
    }

    const title = `${descriptor.title} Wolof Vocabulary`
    const description = `Learn Wolof ${descriptor.title.toLowerCase()} with authentic Senegalese and Gambian spellings, example sentences, and pronunciation notes.`
    const url = buildCanonicalUrl(`/words/${descriptor.slug}`)

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

const relatedPhraseCategories: Partial<Record<WordCategorySlug, PhraseCategorySlug[]>> = {
    core: ['everyday', 'questions', 'introductions'],
    actions: ['travel', 'dining', 'everyday'],
    descriptors: ['everyday', 'market', 'dining'],
    numbers: ['market', 'travel'],
    family: ['family', 'introductions', 'romance'],
    food: ['dining', 'market'],
    basic: ['greetings', 'polite-expressions', 'farewells'],
    time: ['greetings', 'farewells'],
    places: ['travel', 'questions', 'market'],
    body: ['health'],
    people: ['introductions', 'greetings'],
    animals: ['everyday'],
    colors: ['everyday']
}

export default async function WordCategoryPage({ params }: PageParams) {
    const { category } = await params
    const descriptor = findWordCategory(category)

    if (!descriptor) {
        notFound()
    }

    const words = descriptor.items

    return (
        <div className="space-y-8">
            <JsonLdBreadcrumb
                items={[
                    { name: 'Home', item: '/' },
                    { name: 'Words', item: '/words' },
                    { name: descriptor.title, item: `/words/${descriptor.slug}` }
                ]}
            />
            <JsonLdCollectionPage
                description={descriptor.description}
                items={words.map((word) => ({
                    name: word.english,
                    description: `Wolof translation for ${word.english}: ${word.senegal} (Senegal), ${word.gambia} (Gambia)`,
                    url: `https://learnwolof.com/words/${descriptor.slug}?q=${encodeURIComponent(word.english)}`
                }))}
                name={`Wolof ${descriptor.title}`}
                url={`https://learnwolof.com/words/${descriptor.slug}`}
            />
            <header className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Vocabulary</p>
                <h1 className="text-3xl font-bold tracking-tight">{descriptor.title}</h1>
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
                        .filter((category) => category.slug !== descriptor.slug)
                        .map((category) => (
                            <Link
                                className="group block rounded-lg border p-4 transition-colors hover:bg-muted/50"
                                href={`/words/${category.slug}`}
                                key={category.slug}
                            >
                                <h3 className="font-semibold group-hover:text-primary">{category.title}</h3>
                                <p className="text-sm text-muted-foreground">{category.description}</p>
                            </Link>
                        ))}
                </div>
                <div className="mt-10 space-y-4">
                    <h2 className="text-2xl font-bold">Related Phrase Categories</h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {(relatedPhraseCategories[descriptor.slug] ?? ['everyday', 'questions', 'greetings']).flatMap(
                            (slug) => {
                                const phraseCategory = findPhraseCategory(slug)
                                if (!phraseCategory) return []
                                return [
                                    <Link
                                        className="group block rounded-lg border p-4 transition-colors hover:bg-muted/50"
                                        href={`/phrases/${phraseCategory.slug}`}
                                        key={phraseCategory.slug}
                                    >
                                        <h3 className="font-semibold group-hover:text-primary">
                                            {phraseCategory.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">{phraseCategory.description}</p>
                                    </Link>
                                ]
                            }
                        )}
                    </div>
                </div>
            </section>
        </div>
    )
}
