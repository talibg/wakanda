import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { ThemeProvider } from '@/components/theme-provider'
import { DialectProvider } from '@/context/dialect-context'

import './globals.css'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin']
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin']
})

const _siteUrl = new URL('https://learnwolof.com')

import { JsonLdWebSite } from '@/components/json-ld'

import { buildCanonicalUrl } from '@/lib/seo'

export const metadata: Metadata = {
    title: {
        default: 'Learn Wolof | The Best Way to Learn Wolof Online',
        template: '%s | Learn Wolof'
    },
    description:
        'Master Wolof with our comprehensive online guide. Learn essential phrases, vocabulary, and grammar from Senegal and The Gambia. Start speaking Wolof today!',
    keywords: [
        'Learn Wolof',
        'Wolof Language',
        'Senegal Language',
        'Gambia Language',
        'Wolof Phrases',
        'Wolof Vocabulary'
    ],
    authors: [{ name: 'Talib Guyani', url: 'https://github.com/talibg' }],
    creator: 'Talib Guyani',
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://learnwolof.com'),
    alternates: {
        canonical: buildCanonicalUrl('/')
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: buildCanonicalUrl('/'),
        title: 'Learn Wolof | The Best Way to Learn Wolof Online',
        description:
            'Master Wolof with our comprehensive online guide. Learn essential phrases, vocabulary, and grammar from Senegal and The Gambia.',
        siteName: 'Learn Wolof',
        images: [
            {
                url: '/og-learn-wolof.png',
                width: 1200,
                height: 630,
                alt: 'Learn Wolof words and phrases from Senegal and The Gambia'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Learn Wolof | The Best Way to Learn Wolof Online',
        description:
            'Master Wolof with our comprehensive online guide. Learn essential phrases, vocabulary, and grammar from Senegal and The Gambia.',
        creator: '@talibguyani',
        images: ['/og-learn-wolof.png']
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}>
                <JsonLdWebSite />
                <ThemeProvider>
                    <DialectProvider>
                        <div className="flex min-h-screen w-full flex-col bg-background">
                            <SiteHeader />
                            <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">{children}</main>
                            <SiteFooter />
                        </div>
                    </DialectProvider>
                </ThemeProvider>
                <Analytics />
            </body>
        </html>
    )
}
