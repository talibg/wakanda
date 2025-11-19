import type { BreadcrumbList, WithContext } from 'schema-dts'

export function JsonLdWebSite() {
    const schema: WithContext<any> = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Learn Wolof',
        url: 'https://learnwolof.com',
        potentialAction: {
            '@type': 'SearchAction',
            target: 'https://learnwolof.com/search?q={search_term_string}',
            'query-input': 'required name=search_term_string',
        },
    }

    return <script dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} type="application/ld+json" />
}

type BreadcrumbItem = {
    name: string
    item: string
}

export function JsonLdBreadcrumb({ items }: { items: BreadcrumbItem[] }) {
    const schema: WithContext<BreadcrumbList> = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `https://learnwolof.com${item.item}`,
        })),
    }

    return <script dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} type="application/ld+json" />
}

type FaqItem = {
    question: string
    answer: string
}

export function JsonLdFaq({ items }: { items: FaqItem[] }) {
    const schema: WithContext<any> = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
            },
        })),
    }

    return <script dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} type="application/ld+json" />
}
