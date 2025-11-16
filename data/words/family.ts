import type { WolofWord } from '@/data/types'

export const familyWords: WolofWord[] = [
    {
        id: 'family-1',
        english: 'mother',
        senegal: 'yaay',
        gambia: 'yaay',
        category: 'family',
        tags: ['family'],
        exampleSentenceEnglish: 'My mother is at home.',
        exampleSentenceSenegal: 'Sama yaay nekk na ci kër gi.', // "Sama" (my), not "Samay" (my plural)
        exampleSentenceGambia: 'Sama yaay nekk na kër ga.', // "Sama" (my), not "Sunu" (our)
    },
    {
        id: 'family-2',
        english: 'father',
        senegal: 'baay',
        gambia: 'baay',
        category: 'family',
        tags: ['family'],
    },
    {
        id: 'family-3',
        english: 'older brother',
        senegal: 'mag bu góor',
        gambia: 'mag bu góor',
        category: 'family',
        notes: 'Mag means “older sibling”.',
    },
    {
        id: 'family-4',
        english: 'younger sister',
        senegal: 'rakk bu jigéen',
        gambia: 'rakk bu jigéen',
        category: 'family',
        notes: 'Rakk means "younger sibling".',
    },
    {
        id: 'family-5',
        english: 'child',
        senegal: 'xale',
        gambia: 'xale',
        category: 'family',
        notes: 'Gambian pronunciation may add a final “h” sound. "Xale" means a child (a young person), while "doom" means one\'s offspring (son/daughter).',
        tags: ['everyday'],
    },
    {
        id: 'family-6',
        english: 'friend',
        senegal: 'xarit',
        gambia: 'xarit',
        category: 'family',
        exampleSentenceEnglish: 'He is my friend.',
        exampleSentenceSenegal: 'Mooy sama xarit.',
        exampleSentenceGambia: 'Mo sama xarit la.',
    },
    {
        id: 'family-7',
        english: 'wife',
        senegal: 'jabar', // Corrected. "Jàkkar" means husband.
        gambia: 'jabar',
        category: 'family',
        notes: '"Jabar" is the standard word for "wife".',
    },
    {
        id: 'family-8',
        english: 'husband',
        senegal: 'jékkër',
        gambia: 'jekker',
        category: 'family',
        notes: 'The "ë" vowel is common in Senegalese spelling. "Jàkkar" is also used in Senegal.',
    },
    {
        id: 'family-9',
        english: 'family',
        senegal: 'wa kër',
        gambia: 'wa kër',
        category: 'family',
        tags: ['household'],
        notes: 'Literally "the people of the house" (household). "Njëbót" is also used to mean family/lineage.',
    },
    {
        id: 'family-10',
        english: 'neighbor',
        senegal: 'dëkkandoo', // Corrected. "Deret" means "blood".
        gambia: 'dekkandoo',
        category: 'family',
        notes: 'Literally "one who lives with (you)".',
    },
]
