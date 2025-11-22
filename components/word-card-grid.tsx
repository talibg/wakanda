'use client'

import { Info } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useDialect } from '@/context/dialect-context'
import type { WolofWord } from '@/data/types'
import { cn } from '@/lib/utils'

type WordCardGridProps = {
    words: WolofWord[]
}

const dialectLabel = {
    senegal: 'Senegal',
    gambia: 'Gambia'
} as const

export function WordCardGrid({ words }: WordCardGridProps) {
    const { mode } = useDialect()

    if (!words.length) {
        return <p className="text-sm text-muted-foreground">No matching words yet. Try a different search.</p>
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {words.map((word) => {
                const dialectsToShow: Array<'senegal' | 'gambia'> =
                    mode === 'both' ? ['senegal', 'gambia'] : [mode === 'senegal' ? 'senegal' : 'gambia']

                return (
                    <Card key={word.id}>
                        <CardHeader className="pb-2">
                            <div className="flex items-start justify-between gap-3">
                                <CardTitle className="text-lg">{word.english}</CardTitle>
                                {word.notes ? (
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <button
                                                aria-label={`Notes for ${word.english}`}
                                                className="text-muted-foreground transition-colors hover:text-foreground"
                                                type="button"
                                            >
                                                <Info className="h-4 w-4" />
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent className="max-w-xs text-left">{word.notes}</TooltipContent>
                                    </Tooltip>
                                ) : null}
                            </div>
                            {word.tags?.length ? (
                                <CardDescription className="flex flex-wrap gap-2 pt-1">
                                    {word.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary">
                                            {tag}
                                        </Badge>
                                    ))}
                                </CardDescription>
                            ) : null}
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className={cn('space-y-2 text-sm', mode === 'both' ? '' : 'text-base')}>
                                {dialectsToShow.map((dialect) => (
                                    <div key={dialect}>
                                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                            {dialectLabel[dialect]}
                                        </p>
                                        <p className="font-medium text-foreground">
                                            {dialect === 'senegal' ? word.senegal : word.gambia}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            {word.exampleSentenceEnglish ? (
                                <div className="rounded-lg border border-dashed border-muted px-3 py-2 text-xs leading-relaxed text-muted-foreground">
                                    <p className="font-semibold text-foreground">{word.exampleSentenceEnglish}</p>
                                    {mode !== 'gambia' && word.exampleSentenceSenegal ? (
                                        <p className="text-[11px] text-muted-foreground">
                                            {word.exampleSentenceSenegal}
                                        </p>
                                    ) : null}
                                    {mode !== 'senegal' && word.exampleSentenceGambia ? (
                                        <p className="text-[11px] text-muted-foreground">
                                            {word.exampleSentenceGambia}
                                        </p>
                                    ) : null}
                                </div>
                            ) : null}
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}
