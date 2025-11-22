import type { Metadata } from 'next'
import Link from 'next/link'

import { wordCategories } from '@/app/data/words'
import { JsonLdBreadcrumb } from '@/components/json-ld'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { buildCanonicalUrl } from '@/lib/seo'

export const dynamic = 'force-static'

export const metadata: Metadata = {
    title: 'Wolof Vocabulary — Learn Wolof Words from Senegal and Gambia',
    description:
        'Study essential Wolof vocabulary for numbers, family, food, time, and daily basics. Compare Senegalese and Gambian word choices side-by-side.',
    alternates: {
        canonical: buildCanonicalUrl('/words')
    },
    openGraph: {
        title: 'Wolof Vocabulary — Learn Wolof Words from Senegal and Gambia | Learn Wolof',
        description:
            'Study essential Wolof vocabulary for numbers, family, food, time, and daily basics. Compare Senegalese and Gambian word choices side-by-side.',
        url: buildCanonicalUrl('/words'),
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
        title: 'Wolof Vocabulary — Learn Wolof Words from Senegal and Gambia | Learn Wolof',
        description:
            'Study essential Wolof vocabulary for numbers, family, food, time, and daily basics. Compare Senegalese and Gambian word choices side-by-side.',
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

export default function WordsIndexPage() {
    return (
        <div className="space-y-8">
            <JsonLdBreadcrumb
                items={[
                    { name: 'Home', item: '/' },
                    { name: 'Words', item: '/words' }
                ]}
            />
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
                    <Card className="h-full" key={category.slug}>
                        <CardHeader>
                            <CardTitle>{category.title}</CardTitle>
                            <CardDescription>{category.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild variant="secondary">
                                <Link href={`/words/${category.slug}`}>Open {category.title}</Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </section>
        </div>
    )
}
