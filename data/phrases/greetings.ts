import type { WolofPhrase } from '@/data/types'

export const greetingPhrases: WolofPhrase[] = [
    {
        id: 'greetings-1',
        english: 'How are you?',
        senegal: 'Nanga def?',
        gambia: 'Nanga def?',
        category: 'greetings',
        notes: 'Standard opener after the initial "Salaam aleekum".',
        tags: ['formal']
    },
    {
        id: 'greetings-2',
        english: 'I am fine, thank you.',
        senegal: 'Maa ngi ci jàmm, jërëjëf.',
        gambia: 'Mangi ci jam, jerrejef.',
        category: 'greetings',
        notes: 'Literally "I am in peace, thank you." "Maa ngi fii rek" (I am just here) is also common.'
    },
    {
        id: 'greetings-3',
        english: 'Good morning',
        senegal: 'Jàmm nga fanane?',
        gambia: 'Nanga fanaane?',
        category: 'greetings',
        notes: 'Literally “Did you spend the night in peace?” The reply is "Jàmm rekk" (Peace only).'
    },
    {
        id: 'greetings-4',
        english: 'Good evening',
        senegal: 'Jàmm nga yendoo?',
        gambia: 'Jam nga yendoo?',
        category: 'greetings',
        notes: 'Literally "Did you spend the day in peace?" The reply is "Jàmm rekk" (Peace only).'
    },
    {
        id: 'greetings-5',
        english: 'Welcome',
        senegal: 'Dalal ak jàmm',
        gambia: 'Dalal ak jam',
        category: 'greetings',
        tags: ['hospitality'],
        notes: 'Literally "Host in peace" (singular). Use "Dalaleen ak jàmm" for plural.'
    },
    {
        id: 'greetings-6',
        english: 'See you later',
        senegal: 'Ba beneen yoon.',
        gambia: 'Ba beneen yoon.',
        category: 'greetings',
        notes: 'Literally "Until another time".'
    },
    {
        id: 'greetings-7',
        english: 'Peace be with you',
        senegal: 'Salaam aleekum.', // Standardized spelling
        gambia: 'Salaam aleekum.',
        category: 'greetings',
        notes: 'The universal greeting, preceding all others. The required reply is "Maleekum salaam".'
    }
]
