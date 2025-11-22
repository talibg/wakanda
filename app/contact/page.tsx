import type { Metadata } from 'next'
import Link from 'next/link'

import { buildCanonicalUrl } from '@/lib/seo'

export const metadata: Metadata = {
    title: 'Contact Us | Learn Wolof',
    description: 'Contact information for Learn Wolof. Connect with us on GitHub or X (Twitter).',
    alternates: {
        canonical: buildCanonicalUrl('/contact'),
    },
    openGraph: {
        title: 'Contact Us | Learn Wolof',
        description: 'Contact Learn Wolof. Reach out to us via X (Twitter) or GitHub.',
        url: 'https://learnwolof.com/contact',
        siteName: 'Learn Wolof',
        locale: 'en_US',
        type: 'website',
    },
}

export default function ContactPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact Us',
        description: 'Contact information for Learn Wolof',
        url: 'https://learnwolof.com/contact',
        mainEntity: {
            '@type': 'Person',
            name: 'Talib Guyani',
            sameAs: ['https://x.com/talibguyani', 'https://github.com/talibg'],
        },
    }

    return (
        <div className="container flex flex-col items-center justify-center gap-6 py-20 text-center">
            <script dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} type="application/ld+json" />
            <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
            <p className="text-lg text-muted-foreground max-w-[600px]">
                We'd love to hear from you! You can reach out to us through the following channels:
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                    className="rounded-md bg-black px-6 py-3 text-white hover:bg-gray-800 transition-colors"
                    href="https://x.com/talibguyani"
                    rel="noreferrer"
                    target="_blank"
                >
                    Contact via X (@talibguyani)
                </Link>
                <Link
                    className="rounded-md border border-gray-200 bg-white px-6 py-3 text-black hover:bg-gray-50 transition-colors dark:border-gray-800 dark:bg-gray-950 dark:text-white dark:hover:bg-gray-900"
                    href="https://github.com/talibg/wakanda"
                    rel="noreferrer"
                    target="_blank"
                >
                    Visit GitHub Repo
                </Link>
            </div>
        </div>
    )
}
