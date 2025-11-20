import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { JsonLdCollectionPage } from '@/components/json-ld'
import { PhraseCategoryBrowser } from '@/components/phrase-category-browser'
import { getPhrasesByCategory, phraseCategories } from '@/data/index'
import type { PhraseCategory } from '@/data/types'

export const dynamic = 'force-dynamic'

const categoryMap = new Map(phraseCategories.map((category) => [category.id, category]))

const isPhraseCategory = (value: string): value is PhraseCategory => categoryMap.has(value as PhraseCategory)

type PageParams = {
    params: Promise<{
        category: string
    }>
}

export const generateMetadata = async ({ params }: PageParams): Promise<Metadata> => {
    const { category } = await params

    if (!isPhraseCategory(category)) {
        return {
            title: 'Wolof Phrases',
            description: 'Useful Wolof sentences for the Senegambian region.',
        }
    }

    const descriptor = categoryMap.get(category)
    if (!descriptor) {
        return {
            title: 'Wolof Phrases',
            description: 'Useful Wolof sentences for the Senegambian region.',
        }
    }

    return {
        title: `Wolof ${descriptor.label} — ${descriptor.description}`,
        description: `Practice Wolof phrases about ${descriptor.label.toLowerCase()} with clear English explanations plus Senegalese and Gambian variants.`,
    }
}

export default async function PhraseCategoryPage({ params }: PageParams) {
    const { category } = await params
    if (!isPhraseCategory(category)) {
        notFound()
    }

    const descriptor = categoryMap.get(category)
    if (!descriptor) {
        notFound()
    }

    const phrases = getPhrasesByCategory(descriptor.id)

    return (
        <div className="space-y-8">
            <JsonLdCollectionPage
                description={descriptor.description}
                items={phrases.map((phrase) => ({
                    name: phrase.english,
                    description: `Wolof translation for ${phrase.english}: ${phrase.senegal} (Senegal), ${phrase.gambia} (Gambia)`,
                    url: `https://learnwolof.com/phrases/${descriptor.id}?q=${encodeURIComponent(phrase.english)}`,
                }))}
                name={`Wolof ${descriptor.label}`}
                url={`https://learnwolof.com/phrases/${descriptor.id}`}
            />
            <header className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Phrases</p>
                <h1 className="text-3xl font-bold tracking-tight">{descriptor.label}</h1>
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
                        .filter((c) => c.id !== descriptor.id)
                        .map((category) => (
                            <Link
                                className="group block rounded-lg border p-4 transition-colors hover:bg-muted/50"
                                href={`/phrases/${category.id}`}
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
