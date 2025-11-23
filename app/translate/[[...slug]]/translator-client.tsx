'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Fuse from 'fuse.js'
import { ArrowLeftRight, MessageSquareHeart } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useDialect } from '@/context/dialect-context'
import lexicon from '@/data/lexicon.json'
import type { WolofDialectMode } from '@/context/dialect-context'
import { useRouter } from 'next/navigation'

import phraseEntries, { type PhraseEntry } from '../phrase-data'
import wordEntries, { type WordEntry } from '../word-data'

type TranslateDirection = 'en-wo' | 'wo-en'
type Dialect = 'gambian' | 'senegalese' | 'both'
type TranslationSource = 'word' | 'phrase' | 'lexicon'

type TranslationEntry = {
    id: string
    english: string
    wolof: string
    wolofNormalized: string
    dialect: Dialect
    category?: string
    pos?: string
    source: TranslationSource
}

type LexiconRow = {
    id: string
    dialect: Exclude<Dialect, 'both'>
    wolof: string
    wolofNormalized?: string
    english: string
    pos?: string
}

const normalizeSpaces = (value: string) => value.replace(/\s+/g, ' ').trim()
const toSentenceCase = (value: string) => {
    const clean = normalizeSpaces(value)
    const lower = clean.toLowerCase()
    return lower ? lower[0].toUpperCase() + lower.slice(1) : lower
}

const dialectLabel: Record<Dialect, string> = {
    gambian: 'Gambian Wolof',
    senegalese: 'Senegalese Wolof',
    both: 'Works for both dialects'
}

const sourceLabel: Record<TranslationSource, string> = {
    word: 'Core vocabulary',
    phrase: 'Useful phrase',
    lexicon: 'Dictionary entry'
}

const entryMatchesQuery = (entry: TranslationEntry, queryLower: string) => {
    return entry.english.toLowerCase() === queryLower || entry.wolofNormalized === queryLower
}

const curatedWordEntries: TranslationEntry[] = wordEntries.map((entry: WordEntry) => ({
    id: `word-${entry.id}`,
    english: normalizeSpaces(entry.english),
    wolof: normalizeSpaces(entry.wolof),
    wolofNormalized: normalizeSpaces(entry.wolofNormalized ?? entry.wolof).toLowerCase(),
    dialect: entry.dialect,
    category: entry.category,
    pos: entry.pos,
    source: 'word'
}))

const curatedPhraseEntries: TranslationEntry[] = phraseEntries.map((entry: PhraseEntry) => ({
    id: `phrase-${entry.id}`,
    english: normalizeSpaces(entry.english),
    wolof: normalizeSpaces(entry.wolof),
    wolofNormalized: normalizeSpaces(entry.wolof).toLowerCase(),
    dialect: entry.dialect ?? 'both',
    category: entry.category,
    source: 'phrase'
}))

const lexiconEntries: TranslationEntry[] = (lexicon as LexiconRow[]).map((entry) => ({
    id: `lex-${entry.id}`,
    english: normalizeSpaces(entry.english).toLowerCase(),
    wolof: normalizeSpaces(entry.wolof),
    wolofNormalized: normalizeSpaces(entry.wolofNormalized ?? entry.wolof).toLowerCase(),
    dialect: entry.dialect,
    pos: entry.pos,
    source: 'lexicon'
}))

const baseDictionary: TranslationEntry[] = [...curatedWordEntries, ...curatedPhraseEntries, ...lexiconEntries]
const starterEntries: TranslationEntry[] = [...curatedWordEntries, ...curatedPhraseEntries]
const sourcePriority: Record<TranslationSource, number> = {
    word: 0,
    phrase: 1,
    lexicon: 2
}

function useDebouncedValue<T>(value: T, delay = 250) {
    const [debounced, setDebounced] = useState(value)

    useEffect(() => {
        const timeout = window.setTimeout(() => setDebounced(value), delay)
        return () => window.clearTimeout(timeout)
    }, [value, delay])

    return debounced
}

type TranslatorClientProps = {
    initialDirection: TranslateDirection
    initialSearchTerm: string
}

type RecentSearch = {
    query: string
    direction: TranslateDirection
}

const recentsStorageKey = 'wolof-translate-recents'

export default function TranslatorClient({ initialDirection, initialSearchTerm }: TranslatorClientProps) {
    const router = useRouter()
    const { mode } = useDialect()
    const [direction, setDirection] = useState<TranslateDirection>(initialDirection)
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm)
    const inputRef = useRef<HTMLInputElement>(null)
    const debouncedQuery = useDebouncedValue(searchTerm)
    const trimmedQuery = normalizeSpaces(debouncedQuery)
    const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([])

    const focusInput = useCallback(() => {
        inputRef.current?.focus({ preventScroll: true })
    }, [])

    useEffect(() => {
        focusInput()
    }, [focusInput])

    useEffect(() => {
        if (typeof window === 'undefined') return
        const stored = window.localStorage.getItem(recentsStorageKey)
        if (!stored) return
        try {
            const parsed = JSON.parse(stored) as RecentSearch[]
            if (Array.isArray(parsed)) {
                setRecentSearches(parsed.slice(0, 5))
            }
        } catch {
            // ignore bad data
        }
    }, [])

    useEffect(() => {
        const slugDirection = direction === 'en-wo' ? 'english-to-wolof' : 'wolof-to-english'
        const path = trimmedQuery
            ? `/translate/${slugDirection}/${encodeURIComponent(trimmedQuery)}`
            : `/translate/${slugDirection}`
        router.replace(path, { scroll: false })
    }, [trimmedQuery, direction, router])

    useEffect(() => {
        const lowered = trimmedQuery.toLowerCase()
        if (!lowered) return
        const update = (prev: RecentSearch[]) => {
            const filtered = prev.filter((item) => item.query !== lowered || item.direction !== direction)
            return [{ query: lowered, direction }, ...filtered].slice(0, 5)
        }
        setRecentSearches((prev) => {
            const next = update(prev)
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(recentsStorageKey, JSON.stringify(next))
            }
            return next
        })
    }, [debouncedQuery, direction])

    const fuse = useMemo(() => {
        const keys = direction === 'en-wo' ? ['english'] : ['wolofNormalized', 'wolof']
        return new Fuse(baseDictionary, {
            keys,
            threshold: 0.22,
            ignoreLocation: true,
            includeScore: true,
            minMatchCharLength: 2
        })
    }, [direction])

    const matchesDialect = useCallback(
        (entry: TranslationEntry, currentMode: WolofDialectMode) => {
            if (currentMode === 'both') return true
            if (entry.dialect === 'both') return true
            return currentMode === 'senegal' ? entry.dialect === 'senegalese' : entry.dialect === 'gambian'
        },
        []
    )

    const results = useMemo(() => {
        if (!trimmedQuery) return []
        const queryLower = trimmedQuery.toLowerCase()
        const pool = fuse.search(trimmedQuery).map((hit) => hit.item)
        return pool
            .filter((entry) => matchesDialect(entry, mode))
            .sort((a, b) => {
                const aExact = entryMatchesQuery(a, queryLower)
                const bExact = entryMatchesQuery(b, queryLower)
                if (aExact !== bExact) return aExact ? -1 : 1
                if (sourcePriority[a.source] !== sourcePriority[b.source]) {
                    return sourcePriority[a.source] - sourcePriority[b.source]
                }
                return a.english.localeCompare(b.english)
            })
            .slice(0, 80)
    }, [trimmedQuery, fuse, mode, matchesDialect])

    const searchPlaceholder =
        direction === 'en-wo' ? 'Type an English word or phrase to translate…' : 'Type Wolof to see the English meaning…'

    const handleDirectionChange = (next: TranslateDirection) => {
        setDirection(next)
        focusInput()
    }

    return (
        <div className="space-y-8">
            <div className="space-y-4 rounded-2xl border bg-card p-6 shadow-sm">
                <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-1 rounded-full border bg-background p-1">
                        <DirectionButton
                            isActive={direction === 'en-wo'}
                            label="English → Wolof"
                            onClick={() => handleDirectionChange('en-wo')}
                        />
                        <DirectionButton
                            isActive={direction === 'wo-en'}
                            label="Wolof → English"
                            onClick={() => handleDirectionChange('wo-en')}
                        />
                    </div>
                    <Badge variant="secondary" className="gap-1">
                        <ArrowLeftRight className="h-3.5 w-3.5" />
                        Switch direction to see dialect spelling differences.
                    </Badge>
                </div>
                <div className="grid gap-3 md:grid-cols-[2fr,1fr] md:items-center">
                    <Input
                        aria-label="Search translations"
                        autoFocus
                        onChange={(event) => setSearchTerm(event.target.value)}
                        placeholder={searchPlaceholder}
                        ref={inputRef}
                        value={searchTerm}
                    />
                    <p className="text-sm text-muted-foreground md:text-right">
                        Showing {results.length} result{results.length === 1 ? '' : 's'} in{' '}
                        {mode === 'both' ? 'both dialects' : mode === 'senegal' ? 'Senegalese' : 'Gambian'} Wolof.
                    </p>
                </div>
                {recentSearches.length ? (
                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Recent:</span>
                        {recentSearches.map((recent) => (
                            <Button
                                key={`${recent.query}-${recent.direction}`}
                                onClick={() => {
                                    setDirection(recent.direction)
                                    setSearchTerm(recent.query)
                                    focusInput()
                                }}
                                size="sm"
                                variant="secondary"
                                className="h-8 rounded-full"
                            >
                                {recent.direction === 'en-wo' ? 'EN→WO' : 'WO→EN'} · {recent.query}
                            </Button>
                        ))}
                    </div>
                ) : null}
            </div>

            <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
                <div className="space-y-4">
                    {results.length ? (
                        results.map((entry) => (
                            <Card key={entry.id} className="border-border/70">
                                <CardHeader className="pb-2">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="space-y-1">
                                            <CardTitle className="text-lg">
                                                {direction === 'en-wo'
                                                    ? toSentenceCase(entry.english)
                                                    : toSentenceCase(entry.wolof)}
                                            </CardTitle>
                                            <CardDescription className="flex flex-wrap gap-2">
                                                <Badge variant="secondary">{sourceLabel[entry.source]}</Badge>
                                                {entry.category ? (
                                                    <Badge variant="outline" className="capitalize">
                                                        {entry.category}
                                                    </Badge>
                                                ) : null}
                                                {entry.pos ? (
                                                    <Badge variant="outline" className="font-semibold">
                                                        {entry.pos}
                                                    </Badge>
                                                ) : null}
                                            </CardDescription>
                                        </div>
                                        <Badge variant="outline">{dialectLabel[entry.dialect]}</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                            Translation
                                        </p>
                                        <p className="text-base font-medium">
                                            {direction === 'en-wo'
                                                ? toSentenceCase(entry.wolof)
                                                : toSentenceCase(entry.english)}
                                        </p>
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        {direction === 'en-wo'
                                            ? 'Tap the dialect toggle to compare spellings.'
                                            : 'Reverse the direction to see how Wolof is written in each dialect.'}
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : debouncedQuery ? (
                        <Card>
                            <CardHeader>
                                <CardTitle>No matches yet</CardTitle>
                                <CardDescription>
                                    Try a simpler spelling (e.g., use &quot;x&quot; instead of &quot;kh&quot;) or switch
                                    the dialect toggle.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    ) : (
                        <Card>
                            <CardHeader>
                                <CardTitle>Search to see translations</CardTitle>
                                <CardDescription>
                                    Type an English word or Wolof phrase above and we will show the best matches from
                                    our core word lists, phrases, and full dictionary.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    )}
                </div>

                <div className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                <MessageSquareHeart className="h-4 w-4" />
                                Help improve the translator
                            </CardTitle>
                            <CardDescription>
                                Spot a missing word or a spelling we should fix? Send a quick note and we will update
                                the dictionary.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button asChild className="w-full">
                                <a href="mailto:hello@learnwolof.com?subject=Translator%20feedback">
                                    Email feedback
                                </a>
                            </Button>
                            <Button asChild variant="secondary" className="w-full">
                                <a
                                    href="https://github.com/talibg/wakanda/issues/new?title=Translator%20feedback"
                                    rel="noreferrer"
                                    target="_blank"
                                >
                                    Open a GitHub issue
                                </a>
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Translation tips</CardTitle>
                            <CardDescription>
                                English searches work best in lowercase. For Wolof, try both &quot;x&quot; (Senegal) and
                                &quot;kh&quot; (Gambia) spellings.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </div>
    )
}

function DirectionButton({
    isActive,
    label,
    onClick
}: {
    isActive: boolean
    label: string
    onClick: () => void
}) {
    return (
        <Button
            onClick={onClick}
            size="sm"
            variant={isActive ? 'default' : 'ghost'}
            className="rounded-full px-4"
        >
            {label}
        </Button>
    )
}
