import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { MobileNavSidebar, SiteHeader } from '@/components/site-header'
import { ThemeProvider } from '@/components/theme-provider'
import { SidebarProvider } from '@/components/ui/sidebar'
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

export const metadata: Metadata = {
    metadataBase: siteUrl,
    title: 'Learn Wolof — Words and Phrases from Senegal and The Gambia',
    description:
        'Learn authentic Wolof with side-by-side Senegalese and Gambian variants. Study words, phrases, greetings, numbers, and everyday expressions with clear English explanations.',
    openGraph: {
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
                <ThemeProvider>
                    <DialectProvider>
                        <SidebarProvider>
                            <div className="flex min-h-screen w-full flex-col bg-background">
                                <MobileNavSidebar />
                                <SiteHeader />
                                <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">{children}</main>
                            </div>
                        </SidebarProvider>
                    </DialectProvider>
                </ThemeProvider>
                <Analytics />
            </body>
        </html>
    )
}
