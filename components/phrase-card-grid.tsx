'use client'

import { MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useDialect } from '@/context/dialect-context'
import type { WolofPhrase } from '@/data/types'
import { slugifyEnglish } from '@/lib/slugify'

type PhraseCardGridProps = {
    phrases: WolofPhrase[]
}

export function PhraseCardGrid({ phrases }: PhraseCardGridProps) {
    const { mode } = useDialect()

    if (!phrases.length) {
        return <p className="text-sm text-muted-foreground">No phrases found for that search.</p>
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {phrases.map((phrase) => {
                const lines =
                    mode === 'both'
                        ? [
                              { label: 'Senegal', value: phrase.senegal },
                              { label: 'Gambia', value: phrase.gambia }
                          ]
                        : mode === 'senegal'
                          ? [{ label: 'Senegal', value: phrase.senegal }]
                          : [{ label: 'Gambia', value: phrase.gambia }]

                return (
                    <Link
                        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        href={`/phrases/${phrase.category}/${slugifyEnglish(phrase.english)}`}
                        key={phrase.id}
                    >
                        <Card className="h-full transition-colors hover:bg-muted/40">
                            <CardHeader className="space-y-2 pb-2">
                                <CardTitle className="text-lg leading-tight">{phrase.english}</CardTitle>
                                {phrase.tags?.length ? (
                                    <CardDescription className="flex flex-wrap gap-2">
                                        {phrase.tags.map((tag) => (
                                            <Badge key={tag} variant="outline">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </CardDescription>
                                ) : null}
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="space-y-2 text-sm">
                                    {lines.map((line) => (
                                        <div key={`${phrase.id}-${line.label}`}>
                                            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                                {line.label}
                                            </p>
                                            <p className="font-medium text-foreground">{line.value}</p>
                                        </div>
                                    ))}
                                </div>
                                {phrase.notes ? (
                                    <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
                                        <MessageCircle className="h-4 w-4 text-primary" />
                                        <p>{phrase.notes}</p>
                                    </div>
                                ) : null}
                            </CardContent>
                        </Card>
                    </Link>
                )
            })}
        </div>
    )
}
