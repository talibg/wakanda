import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { phraseCategories } from '@/data/index'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Wolof Phrases — Useful Wolof Sentences for Everyday Situations',
    description:
        'Master Wolof greetings, travel tips, market bargaining, questions, and everyday expressions with Senegalese and Gambian dialect notes.',
}

export default function PhrasesIndexPage() {
    return (
        <div className="space-y-8">
            <header className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Phrases</p>
                <h1 className="text-3xl font-bold tracking-tight">Wolof Phrases</h1>
                <p className="text-muted-foreground">
                    These conversational phrases are built for travelers, aid workers, and families reconnecting across
                    Senegal and The Gambia. Tweak the dialect toggle whenever you want to focus on one side of the
                    border.
                </p>
            </header>
            <section className="grid gap-4 sm:grid-cols-2">
                {phraseCategories.map((category) => (
                    <Card key={category.id}>
                        <CardHeader>
                            <CardTitle>{category.label}</CardTitle>
                            <CardDescription>{category.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild variant="secondary">
                                <Link href={`/phrases/${category.id}`}>Open {category.label}</Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </section>
        </div>
    )
}
