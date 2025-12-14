import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { findPhraseCategory, phraseCategories } from '@/app/data/phrases'
import { findWordCategory } from '@/app/data/words'
import { JsonLdBreadcrumb, JsonLdCollectionPage } from '@/components/json-ld'
import { PhraseCategoryBrowser } from '@/components/phrase-category-browser'
import { buildCanonicalUrl } from '@/lib/seo'
import { slugifyEnglish } from '@/lib/slugify'
import type { PhraseCategory as PhraseCategorySlug, WordCategory as WordCategorySlug } from '@/data/types'

export const dynamic = 'force-static'

type PageParams = {
    params: Promise<{
        category: string
    }>
}

const fallbackMetadata: Metadata = {
    title: 'Wolof Phrases',
    description: 'Useful Wolof sentences for the Senegambian region.',
    alternates: {
        canonical: buildCanonicalUrl('/phrases')
    }
}

export const generateStaticParams = () => {
    return phraseCategories.map((category) => ({ category: category.slug }))
}

export const generateMetadata = async ({ params }: PageParams): Promise<Metadata> => {
    const { category } = await params
    const descriptor = findPhraseCategory(category)

    if (!descriptor) {
        return fallbackMetadata
    }

    const title = `${descriptor.title} Wolof Phrases`
    const description = `Learn common Wolof ${descriptor.title.toLowerCase()} phrases from Senegal and The Gambia. Express yourself with clear English meanings and dialect variations.`
    const url = buildCanonicalUrl(`/phrases/${descriptor.slug}`)

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
    greetings: ['basic', 'core'],
    'polite-expressions': ['basic'],
    introductions: ['core', 'family'],
    farewells: ['basic', 'time'],
    everyday: ['core', 'actions', 'descriptors'],
    questions: ['core', 'actions', 'places'],
    travel: ['places', 'numbers', 'actions'],
    market: ['numbers', 'food', 'places'],
    dining: ['food', 'actions'],
    health: ['body', 'places'],
    family: ['family'],
    romance: ['family']
}

export default async function PhraseCategoryPage({ params }: PageParams) {
    const { category } = await params
    const descriptor = findPhraseCategory(category)

    if (!descriptor) {
        notFound()
    }

    const phrases = descriptor.items

    return (
        <div className="space-y-8">
            <JsonLdBreadcrumb
                items={[
                    { name: 'Home', item: '/' },
                    { name: 'Phrases', item: '/phrases' },
                    { name: descriptor.title, item: `/phrases/${descriptor.slug}` }
                ]}
            />
            <JsonLdCollectionPage
                description={descriptor.description}
                items={phrases.map((phrase) => ({
                    name: phrase.english,
                    description: `Wolof translation for ${phrase.english}: ${phrase.senegal} (Senegal), ${phrase.gambia} (Gambia)`,
                    url: `https://learnwolof.com/phrases/${descriptor.slug}/${slugifyEnglish(phrase.english)}`
                }))}
                name={`Wolof ${descriptor.title}`}
                url={`https://learnwolof.com/phrases/${descriptor.slug}`}
            />
            <header className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Phrases</p>
                <h1 className="text-3xl font-bold tracking-tight">{descriptor.title}</h1>
                <p className="text-muted-foreground">
                    {descriptor.description} Each card shows the Senegalese and Gambian dialects next to one another so
                    you can switch depending on where you are traveling.
                </p>
            </header>
            <PhraseCategoryBrowser phrases={phrases} />

            <section className="border-t pt-8">
                <h2 className="mb-6 text-2xl font-bold">Related Categories</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {phraseCategories
                        .filter((category) => category.slug !== descriptor.slug)
                        .map((category) => (
                            <Link
                                className="group block rounded-lg border p-4 transition-colors hover:bg-muted/50"
                                href={`/phrases/${category.slug}`}
                                key={category.slug}
                            >
                                <h3 className="font-semibold group-hover:text-primary">{category.title}</h3>
                                <p className="text-sm text-muted-foreground">{category.description}</p>
                            </Link>
                        ))}
                </div>
                <div className="mt-10 space-y-4">
                    <h2 className="text-2xl font-bold">Related Vocabulary</h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {(relatedWordCategories[descriptor.slug] ?? ['core', 'basic']).flatMap((slug) => {
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
                </div>
            </section>
        </div>
    )
}
