'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useDialect } from '@/context/dialect-context'
import type { WolofLetter } from '@/data/types'

interface AlphabetCardProps {
    letter: WolofLetter
}

export function AlphabetCard({ letter }: AlphabetCardProps) {
    const { mode } = useDialect()

    const showSenegal = mode === 'senegal' || mode === 'both'
    const showGambia = mode === 'gambia' || mode === 'both'

    // Determine if we have distinct variants to show
    const hasDistinctGambia = letter.letterGambia && letter.letter !== letter.letterGambia
    const showBothVariants = mode === 'both' && hasDistinctGambia

    const _primaryLetter = showSenegal ? letter.letter : letter.letterGambia || letter.letter
    const _secondaryLetter = showGambia ? letter.letterGambia : undefined

    const displayPronunciation =
        mode === 'gambia' && letter.pronunciationGambia ? letter.pronunciationGambia : letter.pronunciation

    const displaySoundsLike = mode === 'gambia' && letter.soundsLikeGambia ? letter.soundsLikeGambia : letter.soundsLike

    return (
        <Card className="flex flex-col justify-between overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="bg-muted/30 pb-4 text-center">
                {showBothVariants ? (
                    <div className="flex items-center justify-center gap-4">
                        <div className="flex flex-col items-center">
                            <span className="text-xs font-semibold uppercase text-muted-foreground">Senegal</span>
                            <span className="text-4xl font-black text-primary">{letter.letter}</span>
                        </div>
                        <div className="h-8 w-px bg-border" />
                        <div className="flex flex-col items-center">
                            <span className="text-xs font-semibold uppercase text-muted-foreground">Gambia</span>
                            <span className="text-4xl font-black text-primary">{letter.letterGambia}</span>
                        </div>
                    </div>
                ) : (
                    <div className="text-6xl font-black text-primary">
                        {mode === 'gambia' && letter.letterGambia ? letter.letterGambia : letter.letter}
                    </div>
                )}
                <div className="mt-2 text-sm font-medium text-muted-foreground">/{displayPronunciation}/</div>
            </CardHeader>
            <CardContent className="grid gap-4 p-6">
                <div className="space-y-1 text-center">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Sounds like</p>
                    <p className="font-medium">{displaySoundsLike}</p>
                </div>

                {letter.exampleWord && (
                    <div className="rounded-lg bg-secondary/50 p-3 text-center">
                        <p className="text-lg font-bold text-foreground">{letter.exampleWord}</p>
                        <p className="text-sm text-muted-foreground">{letter.exampleTranslation}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
