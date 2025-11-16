import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Learn Wolof Online — Free Wolof Lessons for Beginners',
    description:
        'Master Wolof words and phrases from Senegal and The Gambia with side-by-side dialect comparisons, authentic pronunciations, and practical study tips.',
}

const highlights = [
    {
        title: 'Explore Wolof Words',
        description:
            'Browse numbers, family members, food, and time vocabulary with both Senegalese and Gambian spellings.',
        href: '/words',
        action: 'Go to Words',
    },
    {
        title: 'Practice Real Phrases',
        description:
            'Study greetings, market talk, travel questions, and everyday expressions for real-life conversations.',
        href: '/phrases',
        action: 'Go to Phrases',
    },
]

export default function HomePage() {
    return (
        <div className="space-y-12">
            <section className="rounded-3xl bg-card p-8 shadow-lg ring-1 ring-border">
                <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Learn Wolof</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-primary">
                    Free Wolof lessons for Senegal and The Gambia
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Wolof is the bridge language of Senegal, The Gambia, and much of coastal West Africa. Learn how the
                    Dakar and Banjul dialects compare through side-by-side cards that highlight spelling, pronunciation,
                    and usage.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                    <Button asChild size="lg">
                        <Link href="/phrases/greetings">Start with Greetings</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                        <Link href="/words">Explore Words</Link>
                    </Button>
                </div>
            </section>

            <section className="grid gap-8 lg:grid-cols-2">
                <article className="space-y-3">
                    <h2 className="text-2xl font-semibold">Why Wolof?</h2>
                    <p className="text-muted-foreground">
                        Speaking Wolof opens doors across Senegal, from bustling markets in Touba to the beaches of
                        Saint-Louis, and helps you connect with Gambian families around Banjul and Serrekunda. Our
                        lessons focus on the shared core of the language while pointing out the subtle dialect
                        differences that locals expect you to know.
                    </p>
                    <p className="text-muted-foreground">
                        Every card uses English explanations, practical usage notes, and optional search to help you
                        remember new vocabulary quickly. Switch between both dialects or zoom in on just Senegal or just
                        Gambia whenever you want.
                    </p>
                </article>
                <div className="grid gap-4">
                    {highlights.map((item) => (
                        <Card key={item.title}>
                            <CardHeader>
                                <CardTitle>{item.title}</CardTitle>
                                <CardDescription>{item.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button asChild variant="secondary">
                                    <Link href={item.href}>{item.action}</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    )
}
