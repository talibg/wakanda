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
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

const siteUrl = new URL('https://learnwolof.com')

import { JsonLdWebSite } from '@/components/json-ld'

export const metadata: Metadata = {
    metadataBase: siteUrl,
    title: 'Learn Wolof — Words and Phrases from Senegal and The Gambia',
    description:
        'Learn authentic Wolof with side-by-side Senegalese and Gambian variants. Study words, phrases, greetings, numbers, and everyday expressions with clear English explanations.',
    keywords: [
        'Wolof',
        'Learn Wolof',
        'Senegal Language',
        'Gambia Language',
        'Wolof Dictionary',
        'Wolof Phrases',
        'Wolof Alphabet',
    ],
    alternates: {
        canonical: 'https://learnwolof.com',
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
    openGraph: {
        // ... existing OG
        title: 'Learn Wolof — Words and Phrases from Senegal and The Gambia',
        description:
            'Learn authentic Wolof with side-by-side Senegalese and Gambian variants. Study words, phrases, greetings, numbers, and everyday expressions with clear English explanations.',
        url: 'https://learnwolof.com',
        type: 'website',
        images: [
            {
                url: '/og-learn-wolof.png',
                width: 1200,
                height: 630,
                alt: 'Learn Wolof words and phrases from Senegal and The Gambia',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Learn Wolof — Words and Phrases from Senegal and The Gambia',
        description:
            'Learn authentic Wolof with side-by-side Senegalese and Gambian variants. Study words, phrases, greetings, numbers, and everyday expressions with clear English explanations.',
        images: ['/og-learn-wolof.png'],
    },
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
