import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { JsonLdFaq } from '@/components/json-ld'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Learn Wolof Online — Free Wolof Lessons for Beginners',
    description:
        'Master Wolof words and phrases from Senegal and The Gambia with side-by-side dialect comparisons, authentic pronunciations, and practical study tips.',
}

const highlights = [
    {
        title: 'Master the Alphabet',
        description: 'Learn the sounds of Wolof, from the gutteral "X" to the nasal "Ñ", with audio examples.',
        href: '/alphabet',
        action: 'Start Alphabet',
    },
    {
        title: 'Explore Wolof Words',
        description:
            'Browse numbers, family members, food, and time vocabulary with both Senegalese and Gambian spellings.',
        href: '/words',
        action: 'Go to Words',
    },
    {
        title: 'Practice Real Phrases',
        description:
            'Study greetings, market talk, travel questions, and everyday expressions for real-life conversations.',
        href: '/phrases',
        action: 'Go to Phrases',
    },
]

const faqs = [
    {
        question: 'Is Wolof hard to learn?',
        answer: 'Wolof is considered moderately easy for English speakers. The pronunciation is phonetic, and the grammar is relatively straightforward. With consistent practice, you can start having basic conversations within a few weeks.',
    },
    {
        question: 'Where is Wolof spoken?',
        answer: 'Wolof is primarily spoken in Senegal, where it is the lingua franca, and in The Gambia. It is also spoken by diaspora communities in Mauritania, Mali, and around the world.',
    },
    {
        question: 'What is the difference between Senegalese and Gambian Wolof?',
        answer: 'The main differences are in spelling and some vocabulary. Senegal uses letters like C, X, Ñ, and Ŋ, while Gambia uses Ch, Kh, Ny, and Ng. The spoken language is largely mutually intelligible.',
    },
    {
        question: 'Do I need to learn both dialects?',
        answer: 'No, you can focus on one dialect based on where you plan to travel or who you want to communicate with. Our app lets you switch between dialects so you can learn either or both.',
    },
]

export default function HomePage() {
    return (
        <div className="space-y-12">
            <JsonLdFaq items={faqs} />
            <section className="rounded-3xl bg-card p-8 shadow-lg ring-1 ring-border">
                <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Learn Wolof</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-primary">
                    Free Wolof lessons for Senegal and The Gambia
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Wolof is the bridge language of Senegal, The Gambia, and much of coastal West Africa. Learn how the
                    Dakar and Banjul dialects compare through side-by-side cards that highlight spelling, pronunciation,
                    and usage.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                    <Button asChild size="lg">
                        <Link href="/phrases/greetings">Start with Greetings</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                        <Link href="/words">Explore Words</Link>
                    </Button>
                </div>
            </section>

            <section className="grid gap-8 lg:grid-cols-2">
                <article className="space-y-3">
                    <h2 className="text-2xl font-semibold">Why Learn Wolof?</h2>
                    <p className="text-muted-foreground">
                        Speaking Wolof opens doors across Senegal, from bustling markets in Touba to the beaches of
                        Saint-Louis, and helps you connect with Gambian families around Banjul and Serrekunda. Whether
                        you're traveling, working with NGOs, or reconnecting with family, Wolof is the key to authentic
                        cultural exchange in West Africa.
                    </p>
                    <p className="text-muted-foreground">
                        Our lessons focus on the shared core of the Senegal and Gambia dialects while pointing out the
                        subtle spelling and vocabulary differences that locals expect you to know. Every card uses
                        English explanations, practical usage notes, and optional search to help you remember new
                        vocabulary quickly.
                    </p>
                </article>
                <div className="grid gap-4">
                    {highlights.map((item) => (
                        <Card key={item.title}>
                            <CardHeader>
                                <CardTitle>{item.title}</CardTitle>
                                <CardDescription>{item.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button asChild variant="secondary">
                                    <Link href={item.href}>{item.action}</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
                <div className="grid gap-6 md:grid-cols-2">
                    {faqs.map((faq) => (
                        <Card key={faq.question}>
                            <CardHeader>
                                <CardTitle className="text-lg">{faq.question}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{faq.answer}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    )
}
