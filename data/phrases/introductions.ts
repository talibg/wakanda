import type { WolofPhrase } from '@/data/types'

export const introductionPhrases: WolofPhrase[] = [
    {
        id: 'where-are-you-from',
        english: 'Where are you from?',
        senegal: 'Fan nga joge?',
        gambia: 'Fo nga joge?',
        category: 'introductions'
    },
    {
        id: 'what-is-your-name',
        english: 'What is your name?',
        senegal: 'Naka nga tudd?',
        gambia: 'Naka nga tudde?',
        category: 'introductions'
    },
    {
        id: 'my-name-is',
        english: 'My name is...',
        senegal: 'Tuddu na ma...',
        gambia: 'Tuddu naama...',
        category: 'introductions',
        notes: 'Replace the ellipsis with your name.'
    },
    {
        id: 'nice-to-meet-you',
        english: 'Nice to meet you',
        senegal: 'Mën naa la gis bu baax',
        gambia: 'Maa la gis neex na',
        category: 'introductions'
    },
    {
        id: 'i-am-from',
        english: 'I am from...',
        senegal: 'Joge naa ci...',
        gambia: 'Joge naa ci...',
        category: 'introductions',
        notes: 'Replace the ellipsis with your city or country.'
    },
    {
        id: 'do-you-speak-english',
        english: 'Do you speak English?',
        senegal: 'Ndax nga xam Angale?',
        gambia: 'Ndax nga sanŋ Angale?',
        category: 'introductions',
        tags: ['travel', 'conversation']
    }
]
