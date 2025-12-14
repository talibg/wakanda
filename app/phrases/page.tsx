import type { Metadata } from 'next'
import Link from 'next/link'

import { phraseCategories } from '@/app/data/phrases'
import { JsonLdBreadcrumb } from '@/components/json-ld'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { buildCanonicalUrl } from '@/lib/seo'

export const dynamic = 'force-static'

export const metadata: Metadata = {
    title: 'Wolof Phrases — Essential Expressions for Daily Life',
    description:
        'Learn essential Wolof phrases for greetings, travel, shopping, and more. Compare Senegalese and Gambian variations.',
    alternates: {
        canonical: buildCanonicalUrl('/phrases')
    },
    openGraph: {
        title: 'Wolof Phrases — Essential Expressions for Daily Life | Learn Wolof',
        description:
            'Learn essential Wolof phrases for greetings, travel, shopping, and more. Compare Senegalese and Gambian variations.',
        url: buildCanonicalUrl('/phrases'),
        type: 'website',
        images: [
            {
                url: 'https://learnwolof.com/og-learn-wolof.png',
                width: 1200,
                height: 630,
                alt: 'Learn Wolof words and phrases from Senegal and The Gambia'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Wolof Phrases — Essential Expressions for Daily Life | Learn Wolof',
        description:
            'Learn essential Wolof phrases for greetings, travel, shopping, and more. Compare Senegalese and Gambian variations.',
        images: ['https://learnwolof.com/og-learn-wolof.png']
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1
        }
    }
}

export default function PhrasesIndexPage() {
    return (
        <div className="space-y-8">
            <JsonLdBreadcrumb
                items={[
                    { name: 'Home', item: '/' },
                    { name: 'Phrases', item: '/phrases' }
                ]}
            />
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
                    <Card key={category.slug}>
                        <CardHeader>
                            <CardTitle>{category.title}</CardTitle>
                            <CardDescription>{category.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild variant="secondary">
                                <Link href={`/phrases/${category.slug}`}>Open {category.title}</Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </section>

            <section className="border-t pt-8 space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Popular searches</h2>
                <p className="text-muted-foreground">
                    Looking for a specific phrase? These are the most common Wolof searches, with dialect-aware
                    spellings.
                </p>
                <div className="flex flex-wrap gap-3">
                    <Button asChild variant="outline">
                        <Link href="/translate/english-to-wolof/thank-you">Thank you in Wolof</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/translate/english-to-wolof/i-love-you">I love you in Wolof</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/translate/english-to-wolof/how-are-you">How are you in Wolof</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/translate/english-to-wolof/good-morning">Good morning in Wolof</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/translate/english-to-wolof/yes">Yes in Wolof</Link>
                    </Button>
                    <Button asChild variant="secondary">
                        <Link href="/guides/wolof-greetings-and-polite-phrases">Read the greetings guide</Link>
                    </Button>
                </div>
            </section>
        </div>
    )
}
