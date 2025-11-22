import type { Metadata } from 'next'

import { AlphabetCard } from '@/components/alphabet-card'
import { alphabet } from '@/data/alphabet'

import { buildCanonicalUrl } from '@/lib/seo'

export const metadata: Metadata = {
    title: 'Wolof Alphabet — Pronunciation Guide',
    description:
        'Learn the Wolof alphabet with our comprehensive pronunciation guide. Master the sounds of Senegal and The Gambia.',
    alternates: {
        canonical: buildCanonicalUrl('/alphabet'),
    },
    openGraph: {
        title: 'Wolof Alphabet — Pronunciation Guide | Learn Wolof',
        description:
            'Learn the Wolof alphabet with our comprehensive pronunciation guide. Master the sounds of Senegal and The Gambia.',
        url: buildCanonicalUrl('/alphabet'),
        type: 'website',
        images: [
            {
                url: 'https://learnwolof.com/og-learn-wolof.png',
                width: 1200,
                height: 630,
                alt: 'Learn Wolof words and phrases from Senegal and The Gambia',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Wolof Alphabet — Pronunciation Guide | Learn Wolof',
        description:
            'Learn the Wolof alphabet with our comprehensive pronunciation guide. Master the sounds of Senegal and The Gambia.',
        images: ['https://learnwolof.com/og-learn-wolof.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
}

import { JsonLdBreadcrumb } from '@/components/json-ld'

export default function AlphabetPage() {
    return (
        <div className="space-y-8">
            <JsonLdBreadcrumb
                items={[
                    { name: 'Home', item: '/' },
                    { name: 'Alphabet', item: '/alphabet' },
                ]}
            />
            <header className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Pronunciation</p>
                <h1 className="text-3xl font-bold tracking-tight">Wolof Alphabet</h1>
                <p className="text-muted-foreground">
                    Wolof is written using the Latin alphabet with a few special characters. Pronunciation is generally
                    phonetic—letters usually make the same sound every time.
                </p>
            </header>

            <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {alphabet.map((letter) => (
                    <AlphabetCard key={letter.id} letter={letter} />
                ))}
            </section>
        </div>
    )
}
