import type { Metadata } from 'next'
import Link from 'next/link'
import { findPhraseCategory } from '@/app/data/phrases'
import { buildCanonicalUrl } from '@/lib/seo'
import { formatDialectSnippet, getEnglishToWolofSnippet } from '@/lib/english-to-wolof-snippet'
import { findClosestPhraseHub, findPhraseLeafByEnglishTerm, findPhraseLeafByWolofTerm } from '@/lib/phrase-seo'
import { Button } from '@/components/ui/button'
import TranslatorClient from './translator-client'

type Props = {
    params: Promise<{ slug?: string[] }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const { slug } = await params
    const direction = slug?.[0]
    const term = slug?.[1] ? decodeURIComponent(slug[1]).replace(/-/g, ' ') : ''
    const slugPath = slug?.length
        ? `/translate/${slug.map((part) => encodeURIComponent(part)).join('/')}`
        : '/translate'
    const selfCanonical = buildCanonicalUrl(slugPath)

    const phraseOwner = term
        ? direction === 'english-to-wolof'
            ? findPhraseLeafByEnglishTerm(term)
            : direction === 'wolof-to-english'
              ? findPhraseLeafByWolofTerm(term)
              : undefined
        : undefined

    const canonical = phraseOwner
        ? buildCanonicalUrl(`/phrases/${phraseOwner.category}/${phraseOwner.slug}`)
        : selfCanonical

    const robotsIndexFollow: Metadata['robots'] = {
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

    const robotsNoindexFollow: Metadata['robots'] = {
        index: false,
        follow: true,
        googleBot: {
            index: false,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1
        }
    }

    const robots = term ? (phraseOwner ? robotsIndexFollow : robotsNoindexFollow) : robotsIndexFollow

    let title = 'Wolof Translator | English to Wolof & Wolof to English'
    let description =
        'Translate between English and Wolof. Learn pronunciation, examples, and dialect variations (Gambia/Senegal).'

    if (term) {
        const displayTerm = `${term.slice(0, 1).toUpperCase()}${term.slice(1)}`

        if (direction === 'english-to-wolof') {
            const snippet = getEnglishToWolofSnippet(term)

            if (snippet) {
                const translation = formatDialectSnippet(snippet)
                title = `${displayTerm} in Wolof — ${translation}`
                description = `How to say "${term}" in Wolof: ${translation}. Dialect-aware results for Senegal and The Gambia.`
            }

            if (!snippet) {
                title = `Translate "${term}" to Wolof - English to Wolof Dictionary`
                description = `How to say "${term}" in Wolof. Translate "${term}" from English to Wolof (Gambian & Senegalese dialects).`
            }
        } else if (direction === 'wolof-to-english') {
            title = `Translate "${term}" to English - Wolof to English Dictionary`
            description = `Meaning of "${term}" in English. Translate "${term}" from Wolof to English.`
        }
    }

    return {
        title,
        description,
        robots,
        openGraph: {
            title,
            description,
            type: 'website',
            url: selfCanonical,
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
            title,
            description,
            images: ['/og-learn-wolof.png']
        },
        alternates: {
            canonical
        }
    }
}

const TranslatePage = async ({ params }: Props) => {
    const { slug } = await params
    const direction = slug?.[0]
    const initialDirection = direction === 'wolof-to-english' ? 'wo-en' : 'en-wo'
    const rawTerm = slug?.[1] ? decodeURIComponent(slug[1]) : ''
    const initialSearchTerm = rawTerm.replace(/-/g, ' ')
    const slugPath = slug?.length
        ? `/translate/${slug.map((part) => encodeURIComponent(part)).join('/')}`
        : '/translate'
    const canonical = buildCanonicalUrl(slugPath)

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: initialSearchTerm
            ? `Translate "${initialSearchTerm}" to ${initialDirection === 'en-wo' ? 'Wolof' : 'English'}`
            : 'Wolof Translator',
        description: initialSearchTerm
            ? `Translate "${initialSearchTerm}" from ${
                  initialDirection === 'en-wo' ? 'English to Wolof' : 'Wolof to English'
              }.`
            : 'Translate between English and Wolof (Gambian & Senegalese dialects).',
        url: canonical,
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'Web'
    }

    const definedTerm = initialSearchTerm
        ? {
              '@context': 'https://schema.org',
              '@type': 'DefinedTerm',
              name: initialSearchTerm,
              inLanguage: initialDirection === 'en-wo' ? 'wo' : 'en',
              inDefinedTermSet: canonical,
              description:
                  initialDirection === 'en-wo'
                      ? `Translation of "${initialSearchTerm}" from English to Wolof.`
                      : `Translation of "${initialSearchTerm}" from Wolof to English.`,
              url: canonical
          }
        : null

    const jsonLdPayload = definedTerm ? [jsonLd, definedTerm] : jsonLd
    const heading = initialSearchTerm
        ? `${initialDirection === 'en-wo' ? 'English to Wolof' : 'Wolof to English'} — ${initialSearchTerm}`
        : 'Wolof Translator'
    const subheading = initialSearchTerm
        ? `Translation from ${initialDirection === 'en-wo' ? 'English to Wolof' : 'Wolof to English'}.`
        : 'Search Wolof ↔ English with dialect-aware results.'

    const phraseOwner = initialSearchTerm
        ? direction === 'english-to-wolof'
            ? findPhraseLeafByEnglishTerm(initialSearchTerm)
            : direction === 'wolof-to-english'
              ? findPhraseLeafByWolofTerm(initialSearchTerm)
              : undefined
        : undefined

    const phraseHref = phraseOwner ? `/phrases/${phraseOwner.category}/${phraseOwner.slug}` : null
    const categoryHref = phraseOwner ? `/phrases/${phraseOwner.category}` : null

    const closestHubSlug =
        !phraseOwner && initialSearchTerm
            ? findClosestPhraseHub({
                  direction: direction === 'wolof-to-english' ? 'wolof' : 'english',
                  term: initialSearchTerm
              })
            : null
    const closestHubDescriptor = closestHubSlug ? findPhraseCategory(closestHubSlug) : null
    const closestHubHref = closestHubDescriptor ? `/phrases/${closestHubDescriptor.slug}` : '/phrases'

    return (
        <>
            {initialSearchTerm ? (
                <section className="mb-6 rounded-2xl border bg-card px-4 py-5 text-center">
                    {phraseHref ? (
                        <>
                            <p className="text-sm text-muted-foreground">Prefer the curated phrasebook version?</p>
                            <p className="mt-1 font-medium">
                                Learn <span className="text-primary">{initialSearchTerm}</span> as a Wolof phrase.
                            </p>
                            <div className="mt-4 flex flex-wrap justify-center gap-3">
                                <Button asChild variant="default">
                                    <Link href={phraseHref}>Open phrase page</Link>
                                </Button>
                                {categoryHref ? (
                                    <Button asChild variant="outline">
                                        <Link href={categoryHref}>Browse category</Link>
                                    </Button>
                                ) : null}
                            </div>
                        </>
                    ) : (
                        <>
                            <p className="text-sm text-muted-foreground">This translate page is a utility.</p>
                            <p className="mt-1 font-medium">
                                Learn more with curated phrasebook lessons instead.
                            </p>
                            <div className="mt-4 flex flex-wrap justify-center gap-3">
                                <Button asChild variant="default">
                                    <Link href={closestHubHref}>
                                        Browse {closestHubDescriptor?.title ?? 'Wolof'} phrases
                                    </Link>
                                </Button>
                                <Button asChild variant="outline">
                                    <Link href="/phrases">All phrase categories</Link>
                                </Button>
                            </div>
                        </>
                    )}
                </section>
            ) : null}
            <div className="mb-6 space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{heading}</h1>
                <p className="text-sm text-muted-foreground md:text-base">{subheading}</p>
            </div>
            <script dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPayload) }} type="application/ld+json" />
            <TranslatorClient initialDirection={initialDirection} initialSearchTerm={initialSearchTerm} />
        </>
    )
}

export default TranslatePage
