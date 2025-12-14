import { ArrowRight, BookOpen, Heart, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { JsonLdArticle, JsonLdBreadcrumb } from '@/components/json-ld'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { buildCanonicalUrl } from '@/lib/seo'

export const metadata = {
    title: 'The First 10 Wolof Phrases You Need to Know',
    description:
        'Start your Wolof journey with these 10 essential phrases. Learn greetings, polite expressions, and how to connect with people in Senegal and The Gambia.',
    alternates: {
        canonical: buildCanonicalUrl('/guides/first-ten-wolof-phrases')
    },
    openGraph: {
        title: 'The First 10 Wolof Phrases You Need to Know',
        description:
            'Start your Wolof journey with these 10 essential phrases. Learn greetings, polite expressions, and how to connect with people in Senegal and The Gambia.',
        type: 'article',
        publishedTime: '2023-10-27T00:00:00.000Z',
        authors: ['Learn Wolof Team'],
        url: buildCanonicalUrl('/guides/first-ten-wolof-phrases')
    },
    twitter: {
        card: 'summary_large_image',
        title: 'The First 10 Wolof Phrases You Need to Know',
        description:
            'Start your Wolof journey with these 10 essential phrases. Learn greetings, polite expressions, and how to connect with people in Senegal and The Gambia.'
    }
}

export default function FirstTenPhrasesPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <JsonLdArticle
                item={{
                    headline: 'The First 10 Wolof Phrases You Need to Know',
                    description:
                        'Start your Wolof journey with these 10 essential phrases. Learn greetings, polite expressions, and how to connect with people in Senegal and The Gambia.',
                    datePublished: '2023-10-27T00:00:00.000Z',
                    authorName: 'Learn Wolof Team'
                }}
                url="https://learnwolof.com/guides/first-ten-wolof-phrases"
            />
            <JsonLdBreadcrumb
                items={[
                    { name: 'Home', item: '/' },
                    { name: 'Guides', item: '/guides' },
                    { name: 'First 10 Wolof Phrases', item: '/guides/first-ten-wolof-phrases' }
                ]}
            />
            <div className="space-y-6 text-center mb-12">
                <div className="inline-flex items-center justify-center p-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Beginner&apos;s Guide
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    The First 10 Wolof Phrases You Need to Know
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Unlock the heart of Senegalese and Gambian culture with these essential expressions. It&apos;s not
                    just about words; it&apos;s about <em>Teranga</em> (hospitality).
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 mb-16">
                <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MessageCircle className="w-5 h-5 text-primary" />
                            The Golden Rule
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            In Wolof culture, greeting is mandatory. Skipping a greeting is considered rude. Always
                            start with "Salaam Aleekum" before asking a question or starting a conversation.
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Heart className="w-5 h-5 text-primary" />
                            Connection First
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Wolof is a language of connection. Asking "How are you?" isn&apos;t just a formality;
                            it&apos;s a genuine inquiry into someone&apos;s well-being.
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-8">
                <h2 className="text-3xl font-bold text-center mb-8">The Top 10 List</h2>

                <div className="grid gap-4">
                    {phrases.map((phrase, index) => (
                        <div
                            className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/20"
                            key={index}
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                                            {index + 1}
                                        </span>
                                        <h3 className="text-xl font-bold">{phrase.wolof}</h3>
                                    </div>
                                    <p className="text-lg text-muted-foreground pl-11">{phrase.english}</p>
                                </div>
                                <div className="md:text-right pl-11 md:pl-0">
                                    <p className="text-sm text-muted-foreground italic">{phrase.context}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10 text-center">
                <h2 className="text-2xl font-bold mb-4">Ready to learn more?</h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                    This is just the beginning. Explore our full collection of words and phrases to deepen your
                    understanding.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Button asChild size="lg" variant="default">
                        <Link href="/phrases/greetings">
                            Master Greetings <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                        <Link href="/words/core">View Core Words</Link>
                    </Button>
                    <Button asChild size="lg" variant="ghost">
                        <Link href="/phrases/romance">Learn Romance Phrases</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

const phrases = [
    {
        wolof: 'Salaam Aleekum',
        english: 'Peace be with you (Hello)',
        context: 'The universal greeting. Always start here.'
    },
    {
        wolof: 'Na nga def?',
        english: 'How are you?',
        context: 'Used to ask one person how they are doing.'
    },
    {
        wolof: 'Mangi fi rekk',
        english: 'I am fine (literally: I am here only)',
        context: "The standard response to 'Na nga def?'"
    },
    {
        wolof: 'Jërëjëf',
        english: 'Thank you',
        context: 'Express gratitude sincerely.'
    },
    {
        wolof: 'Waaw / Déedéet',
        english: 'Yes / No',
        context: 'Essential for basic communication.'
    },
    {
        wolof: 'Jàmm nga fanaan',
        english: 'Did you sleep in peace? (Good morning)',
        context: 'Used specifically in the morning.'
    },
    {
        wolof: 'Agsiileen',
        english: 'Welcome (plural)',
        context: 'Inviting people into your home or space.'
    },
    {
        wolof: 'Baal ma',
        english: 'Sorry / Excuse me',
        context: 'Used to apologize or get attention politely.'
    },
    {
        wolof: 'Naka suba si?',
        english: 'How is the morning?',
        context: 'Small talk is very important.'
    },
    {
        wolof: 'Ba beneen yoon',
        english: 'Goodbye (Until next time)',
        context: 'A polite way to part ways.'
    }
]
