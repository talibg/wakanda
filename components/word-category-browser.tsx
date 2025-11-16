'use client'

import { useMemo, useState } from 'react'

import { SearchInput } from '@/components/search-input'
import { WordCardGrid } from '@/components/word-card-grid'
import type { WolofWord } from '@/data/types'

type WordCategoryBrowserProps = {
    words: WolofWord[]
}

export function WordCategoryBrowser({ words }: WordCategoryBrowserProps) {
    const [query, setQuery] = useState('')

    const normalizedQuery = query.trim().toLowerCase()

    const filteredWords = useMemo(() => {
        if (!normalizedQuery) return words
        return words.filter((word) => {
            const haystack = [word.english, word.senegal, word.gambia].join(' ').toLowerCase()
            return haystack.includes(normalizedQuery)
        })
    }, [normalizedQuery, words])

    return (
        <div className="space-y-6">
            <SearchInput onChange={setQuery} placeholder="Search by English or Wolof" value={query} />
            <WordCardGrid words={filteredWords} />
        </div>
    )
}
