import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { wordCategories } from '@/data/index'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Wolof Vocabulary — Learn Wolof Words from Senegal and Gambia',
    description:
        'Study essential Wolof vocabulary for numbers, family, food, time, and daily basics. Compare Senegalese and Gambian word choices side-by-side.',
}

export default function WordsIndexPage() {
    return (
        <div className="space-y-8">
            <header className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Vocabulary</p>
                <h1 className="text-3xl font-bold tracking-tight">Wolof Words</h1>
                <p className="text-muted-foreground">
                    Jump into curated word lists that highlight pronunciation quirks and everyday usage notes. Dialect
                    toggles make it easy to compare Senegal and Gambia directly on each card.
                </p>
            </header>
            <section className="grid gap-4 sm:grid-cols-2">
                {wordCategories.map((category) => (
                    <Card className="h-full" key={category.id}>
                        <CardHeader>
                            <CardTitle>{category.label}</CardTitle>
                            <CardDescription>{category.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild variant="secondary">
                                <Link href={`/words/${category.id}`}>Open {category.label}</Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </section>
        </div>
    )
}
