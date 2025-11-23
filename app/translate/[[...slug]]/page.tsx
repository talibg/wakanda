import type { Metadata } from 'next'
import TranslatorClient from './translator-client'

type Props = {
    params: Promise<{ slug?: string[] }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const direction = slug?.[0]
    const term = slug?.[1] ? decodeURIComponent(slug[1]) : ''

    let title = 'Wolof Translator | English to Wolof & Wolof to English'
    let description =
        'Translate between English and Wolof. Learn pronunciation, examples, and dialect variations (Gambia/Senegal).'

    if (term) {
        if (direction === 'english-to-wolof') {
            title = `Translate "${term}" to Wolof - English to Wolof Dictionary`
            description = `How to say "${term}" in Wolof. Translate "${term}" from English to Wolof (Gambian & Senegalese dialects).`
        } else if (direction === 'wolof-to-english') {
            title = `Translate "${term}" to English - Wolof to English Dictionary`
            description = `Meaning of "${term}" in English. Translate "${term}" from Wolof to English.`
        }
    }

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'website'
        }
    }
}

export default async function TranslatePage({ params }: Props) {
    const { slug } = await params
    const initialDirection = slug?.[0] === 'wolof-to-english' ? 'wo-en' : 'en-wo'
    const initialSearchTerm = slug?.[1] ? decodeURIComponent(slug[1]) : ''

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
        url: `https://wakanda.com/translate/${slug?.join('/') || ''}`,
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'Web'
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <TranslatorClient initialDirection={initialDirection} initialSearchTerm={initialSearchTerm} />
        </>
    )
}
