import type { WolofWord } from '@/data/types'

export const coreWords: WolofWord[] = [
    {
        id: 'core-i',
        english: 'I',
        senegal: 'man',
        gambia: 'man',
        category: 'core',
        tags: ['pronoun'],
        exampleSentenceEnglish: 'I am learning Wolof.',
        exampleSentenceSenegal: 'Maa ngi jang Wolof.',
        exampleSentenceGambia: 'Maa ngi jang Wolof.'
    },
    {
        id: 'core-you-singular',
        english: 'you (singular)',
        senegal: 'yow',
        gambia: 'yow',
        category: 'core',
        tags: ['pronoun'],
        exampleSentenceEnglish: 'You are here.',
        exampleSentenceSenegal: 'Yow, nekk nga fii.',
        exampleSentenceGambia: 'Yow, nekk nga fii.'
    },
    {
        id: 'core-you-plural',
        english: 'you (plural)',
        senegal: 'yéen',
        gambia: 'yeen',
        category: 'core',
        tags: ['pronoun'],
        notes: 'Used when speaking to a group.'
    },
    {
        id: 'core-we',
        english: 'we',
        senegal: 'ñun',
        gambia: 'ñun',
        category: 'core',
        tags: ['pronoun'],
        notes: 'Often written as "nun" in simplified spelling.',
        exampleSentenceEnglish: 'We are going now.',
        exampleSentenceSenegal: 'Ñun, nu ngi dem léegi.',
        exampleSentenceGambia: 'Ñun, ñu ngi dem léegi.'
    }
]

