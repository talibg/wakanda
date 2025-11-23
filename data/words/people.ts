import type { WolofWord } from '@/data/types'

export const peopleWords: WolofWord[] = [
    {
        id: 'person',
        english: 'person',
        senegal: 'nit',
        gambia: 'nit',
        category: 'people',
        exampleSentenceEnglish: 'He is a good person.',
        exampleSentenceSenegal: 'Nit ku baax la.',
        exampleSentenceGambia: 'Nit ku baax la.'
    },
    {
        id: 'man',
        english: 'man',
        senegal: 'góor',
        gambia: 'gor',
        category: 'people',
        exampleSentenceEnglish: 'The man is tall.',
        exampleSentenceSenegal: 'Góor bi dafa rëy.',
        exampleSentenceGambia: 'Gor bi dafa rey.',
        notes: 'Spelling shifts slightly between Senegalese (góor) and Gambian (gor).'
    },
    {
        id: 'woman',
        english: 'woman',
        senegal: 'jigéen',
        gambia: 'jiggen',
        category: 'people',
        exampleSentenceEnglish: 'The woman is kind.',
        exampleSentenceSenegal: 'Jigéen ji dafa jub.',
        exampleSentenceGambia: 'Jiggen ji dafa jub.'
    },
    {
        id: 'child',
        english: 'child',
        senegal: 'xale',
        gambia: 'xaleh',
        category: 'people',
        exampleSentenceEnglish: 'The child is playing.',
        exampleSentenceSenegal: 'Xale bi đangay weyal.',
        exampleSentenceGambia: 'Xaleh bi dangay weyal.'
    },
    {
        id: 'boy',
        english: 'boy',
        senegal: 'xale bu góor',
        gambia: 'xaleh bu gor',
        category: 'people',
        exampleSentenceEnglish: 'The boy is running.',
        exampleSentenceSenegal: 'Xale bu góor bi đangay daw.',
        exampleSentenceGambia: 'Xaleh bu gor bi dangay daw.',
        notes: 'Literally “male child”.'
    },
    {
        id: 'girl',
        english: 'girl',
        senegal: 'xale bu jigéen',
        gambia: 'xaleh bu jiggen',
        category: 'people',
        exampleSentenceEnglish: 'The girl is laughing.',
        exampleSentenceSenegal: 'Xale bu jigéen bi đangay ree.',
        exampleSentenceGambia: 'Xaleh bu jiggen bi dangay ree.',
        notes: 'Literally “female child”.'
    },
    {
        id: 'friend',
        english: 'friend',
        senegal: 'xarit',
        gambia: 'xarit',
        category: 'people',
        exampleSentenceEnglish: 'He is my friend.',
        exampleSentenceSenegal: 'Xarit laa ko.',
        exampleSentenceGambia: 'Xarit laa ko.',
        tags: ['social']
    },
    {
        id: 'neighbour',
        english: 'neighbour',
        senegal: 'dëkkandoo',
        gambia: 'dekkandoo',
        category: 'people',
        exampleSentenceEnglish: 'My neighbour is very nice.',
        exampleSentenceSenegal: 'Sama dëkkandoo dafa baax.',
        exampleSentenceGambia: 'Sama dekkandoo dafa baax.',
        notes: 'Used for someone who lives near you.'
    },
    {
        id: 'foreigner',
        english: 'foreigner / white person',
        senegal: 'tubaab',
        gambia: 'tubab',
        category: 'people',
        exampleSentenceEnglish: 'The foreigner speaks Wolof.',
        exampleSentenceSenegal: 'Tubaab bi đangay wax Wolof.',
        exampleSentenceGambia: 'Tubab bi dangay wax Wolof.',
        notes: 'Often specifically used for Europeans/white foreigners.'
    },
    {
        id: 'seller',
        english: 'seller / trader',
        senegal: 'jaaykat',
        gambia: 'jaaykat',
        category: 'people',
        exampleSentenceEnglish: 'The seller is at the market.',
        exampleSentenceSenegal: 'Jaaykat bi nekk na ci marse bi.',
        exampleSentenceGambia: 'Jaaykat bi ne na ci marse bi.',
        tags: ['market', 'work']
    }
]
