import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { WordCategoryBrowser } from '@/components/word-category-browser'
import { getWordsByCategory, wordCategories } from '@/data/index'
import type { WordCategory } from '@/data/types'

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
        }
    }

    const descriptor = categoryMap.get(category)
    if (!descriptor) {
        return {
            title: 'Wolof Vocabulary',
            description: 'Detailed Wolof vocabulary lessons for Senegal and The Gambia.',
        }
    }

    return {
        title: `Wolof ${descriptor.label} — ${descriptor.description}`,
        description: `Learn Wolof ${descriptor.label.toLowerCase()} with authentic Senegalese and Gambian spellings, example sentences, and pronunciation notes.`,
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
            <header className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Vocabulary</p>
                <h1 className="text-3xl font-bold tracking-tight">{descriptor.label}</h1>
                <p className="text-muted-foreground">
                    {descriptor.description} Compare how Wolof is written in Dakar versus Banjul, then use the search
                    bar to find the words you need right away.
                </p>
            </header>
            <WordCategoryBrowser words={words} />
        </div>
    )
}
