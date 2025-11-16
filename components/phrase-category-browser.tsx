'use client'

import { useMemo, useState } from 'react'

import { PhraseCardGrid } from '@/components/phrase-card-grid'
import { SearchInput } from '@/components/search-input'
import type { WolofPhrase } from '@/data/types'

type PhraseCategoryBrowserProps = {
    phrases: WolofPhrase[]
}

export function PhraseCategoryBrowser({ phrases }: PhraseCategoryBrowserProps) {
    const [query, setQuery] = useState('')
    const normalizedQuery = query.trim().toLowerCase()

    const filteredPhrases = useMemo(() => {
        if (!normalizedQuery) return phrases
        return phrases.filter((phrase) => {
            const haystack = [phrase.english, phrase.senegal, phrase.gambia].join(' ').toLowerCase()
            return haystack.includes(normalizedQuery)
        })
    }, [normalizedQuery, phrases])

    return (
        <div className="space-y-6">
            <SearchInput onChange={setQuery} placeholder="Search by meaning or dialect" value={query} />
            <PhraseCardGrid phrases={filteredPhrases} />
        </div>
    )
}
