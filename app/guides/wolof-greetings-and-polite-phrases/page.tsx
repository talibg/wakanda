import { Heart, MessageCircle } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { JsonLdArticle, JsonLdBreadcrumb, JsonLdFaq } from '@/components/json-ld'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDialectSnippet, getEnglishToWolofSnippet } from '@/lib/english-to-wolof-snippet'
import { buildCanonicalUrl } from '@/lib/seo'

export const dynamic = 'force-static'

export const metadata: Metadata = {
    title: 'Wolof Greetings: Good Morning, How Are You, Thank You (With Translations)',
    description:
        'Learn essential Wolof greetings and polite phrases with Senegalese and Gambian spellings: good morning, how are you, thank you, yes, and I love you.',
    alternates: {
        canonical: buildCanonicalUrl('/guides/wolof-greetings-and-polite-phrases')
    },
    openGraph: {
        title: 'Wolof Greetings: Good Morning, How Are You, Thank You (With Translations)',
        description:
            'Learn essential Wolof greetings and polite phrases with Senegalese and Gambian spellings: good morning, how are you, thank you, yes, and I love you.',
        type: 'article',
        publishedTime: '2025-12-14T00:00:00.000Z',
        authors: ['Learn Wolof Team'],
        url: buildCanonicalUrl('/guides/wolof-greetings-and-polite-phrases')
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Wolof Greetings: Good Morning, How Are You, Thank You (With Translations)',
        description:
            'Learn essential Wolof greetings and polite phrases with Senegalese and Gambian spellings: good morning, how are you, thank you, yes, and I love you.'
    }
}

const keyPhrases = [
    {
        english: 'Thank you',
        usage: 'The most common way to say thank you in Wolof.',
        href: '/translate/english-to-wolof/thank-you'
    },
    {
        english: 'Good morning',
        usage:
            'Often literally asks if you spent the night in peace. Many people also greet with "Salaam aleekum" first.',
        href: '/translate/english-to-wolof/good-morning'
    },
    {
        english: 'How are you?',
        usage: 'A standard follow-up after a greeting.',
        href: '/translate/english-to-wolof/how-are-you'
    },
    {
        english: 'Yes',
        usage: 'A basic word you will use constantly.',
        href: '/translate/english-to-wolof/yes'
    },
    {
        english: 'I love you',
        usage: 'A common romance phrase.',
        href: '/translate/english-to-wolof/i-love-you'
    }
]

const faqs = [
    {
        question: 'What do people mean by “good morning in Senegalese”?',
        answer: 'In Senegal, Wolof is the most common everyday language, so most people searching “Senegalese” mean Wolof. Senegal is multilingual though, and greetings differ across languages.'
    },
    {
        question: 'Do Wolof spellings change between Senegal and The Gambia?',
        answer: 'Yes. The spoken language is very similar, but spellings differ. Senegal uses letters like X, Ñ, and Ŋ, while Gambian spelling often uses Kh, Ny, and Ng.'
    }
]

const WolofGreetingsAndPolitePhrasesPage = () => {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <JsonLdArticle
                item={{
                    headline: 'Wolof Greetings: Good Morning, How Are You, Thank You (With Translations)',
                    description:
                        'Learn essential Wolof greetings and polite phrases with Senegalese and Gambian spellings: good morning, how are you, thank you, yes, and I love you.',
                    datePublished: '2025-12-14T00:00:00.000Z',
                    authorName: 'Learn Wolof Team'
                }}
                url="https://learnwolof.com/guides/wolof-greetings-and-polite-phrases"
            />
            <JsonLdFaq items={faqs} />
            <JsonLdBreadcrumb
                items={[
                    { name: 'Home', item: '/' },
                    { name: 'Guides', item: '/guides' },
                    { name: 'Greetings & Polite Phrases', item: '/guides/wolof-greetings-and-polite-phrases' }
                ]}
            />

            <header className="space-y-4 text-center mb-10">
                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Beginner guide</p>
                <h1 className="text-4xl font-bold tracking-tight">
                    Wolof greetings and polite phrases you&apos;ll actually use
                </h1>
                <p className="text-muted-foreground text-lg">
                    These cover the most searched basics like <em>thank you in Wolof</em> and <em>good morning in
                    Wolof</em>, with Senegal and Gambia spellings side-by-side.
                </p>
            </header>

            <section className="grid gap-4 md:grid-cols-2">
                <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MessageCircle className="w-5 h-5 text-primary" />
                            Greeting first
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            In many Wolof-speaking contexts, you greet before anything else. If you only remember one
                            opener, start with <Link href="/translate/english-to-wolof/hello">hello</Link>.
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Heart className="w-5 h-5 text-primary" />
                            Politeness pays off
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Even a short <Link href="/translate/english-to-wolof/thank-you">thank you</Link> earns smiles
                            fast. Pair it with <Link href="/translate/english-to-wolof/please">please</Link> when asking
                            for something.
                        </p>
                    </CardContent>
                </Card>
            </section>

            <section className="mt-12 space-y-6">
                <h2 className="text-3xl font-bold tracking-tight">Translations</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    {keyPhrases.map((item) => {
                        const snippet = getEnglishToWolofSnippet(item.english)

                        if (!snippet) {
                            return (
                                <Card key={item.english}>
                                    <CardHeader>
                                        <CardTitle>{item.english}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{item.usage}</p>
                                        <Button asChild className="mt-4" variant="secondary">
                                            <Link href={item.href}>Open translator</Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            )
                        }

                        const translation = formatDialectSnippet(snippet)

                        return (
                            <Card key={item.english}>
                                <CardHeader>
                                    <CardTitle>{item.english} in Wolof</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <p className="text-lg font-semibold text-primary">{translation}</p>
                                    <p className="text-sm text-muted-foreground">{item.usage}</p>
                                    <div className="flex flex-wrap gap-3 pt-2">
                                        <Button asChild variant="secondary">
                                            <Link href={item.href}>See details</Link>
                                        </Button>
                                        {snippet.kind === 'phrase' ? (
                                            <Button asChild variant="outline">
                                                <Link href={`/phrases/${snippet.category}`}>More phrases</Link>
                                            </Button>
                                        ) : (
                                            <Button asChild variant="outline">
                                                <Link href={`/words/${snippet.category}`}>More words</Link>
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </section>

            <section className="mt-12 space-y-4 border-t pt-8">
                <h2 className="text-2xl font-bold tracking-tight">Keep learning</h2>
                <div className="flex flex-wrap gap-3">
                    <Button asChild variant="default">
                        <Link href="/phrases/greetings">Study greeting phrases</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/words/core">Learn core words</Link>
                    </Button>
                    <Button asChild variant="ghost">
                        <Link href="/translate">Use the translator</Link>
                    </Button>
                </div>
            </section>
        </div>
    )
}

export default WolofGreetingsAndPolitePhrasesPage
