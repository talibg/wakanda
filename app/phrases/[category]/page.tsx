import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

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
            <header className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Phrases</p>
                <h1 className="text-3xl font-bold tracking-tight">{descriptor.label}</h1>
                <p className="text-muted-foreground">
                    {descriptor.description} Each card shows the Senegalese and Gambian dialects next to one another so
                    you can switch depending on where you are traveling.
                </p>
            </header>
            <PhraseCategoryBrowser phrases={phrases} />
        </div>
    )
}
