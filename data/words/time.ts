import type { WolofWord } from '@/data/types'

export const timeWords: WolofWord[] = [
    {
        id: 'time-1',
        english: 'today',
        senegal: 'tay',
        gambia: 'tay',
        category: 'time',
        tags: ['time'],
    },
    {
        id: 'time-2',
        english: 'tomorrow',
        senegal: 'suba',
        gambia: 'suba',
        category: 'time',
    },
    {
        id: 'time-3',
        english: 'yesterday',
        senegal: 'démb',
        gambia: 'demb',
        category: 'time',
        notes: 'Senegalese standard orthography uses the acute accent.',
    },
    {
        id: 'time-4',
        english: 'morning',
        senegal: 'suba', // The core word is "suba"
        gambia: 'suba',
        category: 'time',
        notes: 'Also means "tomorrow". The full term for the time period is often "suba gi" (Senegal) or "suba si" (Gambia), but "suba" is used generally.',
    },
    {
        id: 'time-5',
        english: 'evening',
        senegal: 'ngoon si',
        gambia: 'ngoon si',
        category: 'time',
        notes: 'Used for late afternoon visits (3 PM to 6 PM).',
    },
    {
        id: 'time-6',
        english: 'night',
        senegal: 'guddi',
        gambia: 'gudi',
        category: 'time',
        notes: 'Senegalese standard often uses double consonants to indicate vowel length.',
    },
    {
        id: 'time-7',
        english: 'now',
        senegal: 'léegi',
        gambia: 'leegi',
        category: 'time',
        exampleSentenceEnglish: 'We are leaving now.',
        exampleSentenceSenegal: 'Nu ngi génn léegi.',
        exampleSentenceGambia: 'Ñu ngi dem léegi.', // Corrected to use the continuous marker 'ngi'
    },
    {
        id: 'time-8',
        english: 'later',
        senegal: 'ci kanam', // Corrected. More common and distinct than 'leegi-leegi'.
        gambia: 'chi kanam',
        category: 'time',
        notes: 'Literally "in front." Also common is "leegi-leegi" (in a little bit).',
    },
    {
        id: 'time-9',
        english: 'soon',
        senegal: 'ci lu gàtt', // Corrected to mean "in a short time."
        gambia: 'chi lu gatt',
        category: 'time',
        notes: 'Literally "in a short thing/time".',
    },
    {
        id: 'time-10',
        english: 'time/hour',
        senegal: 'waxtu',
        gambia: 'wahtu',
        category: 'time',
        tags: ['clock'],
        notes: 'A common difference in pronunciation/spelling (x vs h).',
    },
]
