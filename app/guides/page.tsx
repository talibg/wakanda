import type { Metadata } from 'next'
import Link from 'next/link'

import { JsonLdBreadcrumb } from '@/components/json-ld'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { buildCanonicalUrl } from '@/lib/seo'

export const dynamic = 'force-static'

export const metadata: Metadata = {
    title: 'Wolof Guides — Practical Lessons for Beginners',
    description:
        'Beginner-friendly Wolof guides for greetings, travel, and everyday conversations in Senegal and The Gambia.',
    alternates: {
        canonical: buildCanonicalUrl('/guides')
    },
    openGraph: {
        title: 'Wolof Guides — Practical Lessons for Beginners',
        description:
            'Beginner-friendly Wolof guides for greetings, travel, and everyday conversations in Senegal and The Gambia.',
        url: buildCanonicalUrl('/guides'),
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
        title: 'Wolof Guides — Practical Lessons for Beginners',
        description:
            'Beginner-friendly Wolof guides for greetings, travel, and everyday conversations in Senegal and The Gambia.',
        images: ['https://learnwolof.com/og-learn-wolof.png']
    }
}

const guides = [
    {
        title: 'Wolof Greetings & Polite Phrases',
        description: 'Good morning, how are you, thank you, and more — with Senegal and Gambia spellings.',
        href: '/guides/wolof-greetings-and-polite-phrases',
        action: 'Open Guide'
    },
    {
        title: 'First 10 Wolof Phrases',
        description: 'A quick starter set of the most useful phrases for day one.',
        href: '/guides/first-ten-wolof-phrases',
        action: 'Read Guide'
    },
    {
        title: 'Travel Survival Guide',
        description: 'Taxis, markets, food, and emergencies — essential travel phrases.',
        href: '/guides/wolof-travel-survival-guide',
        action: 'Read Guide'
    }
]

const popularTranslations = [
    { label: 'Thank you in Wolof', href: '/translate/english-to-wolof/thank-you' },
    { label: 'I love you in Wolof', href: '/translate/english-to-wolof/i-love-you' },
    { label: 'Good morning in Wolof', href: '/translate/english-to-wolof/good-morning' },
    { label: 'How are you in Wolof', href: '/translate/english-to-wolof/how-are-you' },
    { label: 'Yes in Wolof', href: '/translate/english-to-wolof/yes' }
]

const GuidesPage = () => {
    return (
        <div className="space-y-10">
            <JsonLdBreadcrumb
                items={[
                    { name: 'Home', item: '/' },
                    { name: 'Guides', item: '/guides' }
                ]}
            />

            <header className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Guides</p>
                <h1 className="text-3xl font-bold tracking-tight">Wolof Guides</h1>
                <p className="text-muted-foreground">
                    Short, practical lessons you can use immediately. Each guide links back into the phrasebook and
                    dictionary so you can keep learning.
                </p>
            </header>

            <section className="grid gap-4 sm:grid-cols-2">
                {guides.map((guide) => (
                    <Card className="h-full" key={guide.href}>
                        <CardHeader>
                            <CardTitle>{guide.title}</CardTitle>
                            <CardDescription>{guide.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild variant="secondary">
                                <Link href={guide.href}>{guide.action}</Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </section>

            <section className="space-y-4 border-t pt-8">
                <h2 className="text-2xl font-bold tracking-tight">Popular Wolof Translations</h2>
                <div className="flex flex-wrap gap-3">
                    {popularTranslations.map((item) => (
                        <Button asChild key={item.href} variant="outline">
                            <Link href={item.href}>{item.label}</Link>
                        </Button>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default GuidesPage

