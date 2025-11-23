import type { WolofPhrase } from '@/data/types'

export const everydayPhrases: WolofPhrase[] = [
    {
        id: 'everyday-1',
        english: 'I am hungry.',
        senegal: 'Dama xiif.', // Corrected to 1st person singular ('I')
        gambia: 'Dama khiif.', // Corrected to 1st person singular ('I')
        category: 'everyday',
        tags: ['needs'],
        notes: 'Literally "I have become hungry" or "I am in a state of hunger".'
    },
    {
        id: 'everyday-2',
        english: 'I am tired.',
        senegal: 'Dama sonn.', // Corrected to 1st person singular ('I')
        gambia: 'Dama sonn.', // Corrected to 1st person singular ('I')
        category: 'everyday'
    },
    {
        id: 'everyday-3',
        english: 'I live in ...',
        senegal: 'Maa ngi dëkk ci ...',
        gambia: 'Mangi dekk chi ...',
        category: 'everyday',
        notes: 'Replace ellipsis with town or neighborhood. The Gambian spelling reflects a common simplification.'
    },
    {
        id: 'everyday-4',
        english: 'I do not understand.',
        senegal: 'Degguma.',
        gambia: 'Deguma.',
        category: 'everyday',
        tags: ['learning'],
        notes: 'Uses the negative suffix -u-ma (understand-not-I).'
    },
    {
        id: 'everyday-5',
        english: 'Do you speak English?',
        senegal: 'Danga wax angale?',
        gambia: 'Dang wakh angale?',
        category: 'everyday',
        notes: 'Gambian speakers often shorten the prefix "Danga" to "Dang".'
    },
    {
        id: 'everyday-6',
        english: 'I need help.',
        senegal: 'Dama soxla ndimbal.', // Corrected to simple present tense 'Dama'
        gambia: 'Dama sohla ndimbal.',
        category: 'everyday',
        notes: 'Soxla is the verb "to need". Ndmbal is the noun "help".'
    },
    {
        id: 'jam-rekk',
        english: 'I am fine / all good / peace only',
        senegal: 'Jàmm rekk',
        gambia: 'Jam rekk',
        category: 'everyday',
        notes: 'Very common reply to greetings such as “Nanga def?” or “Ana waa kër gi?”'
    }
]
