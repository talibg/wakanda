import type { WolofWord } from '@/data/types'

export const numbersWords: WolofWord[] = [
    {
        id: 'numbers-1',
        english: 'one',
        senegal: 'benn',
        gambia: 'benn',
        category: 'numbers',
        tags: ['counting'],
        exampleSentenceEnglish: 'I have one mango.',
        exampleSentenceSenegal: 'Am naa benn mango.',
        exampleSentenceGambia: 'Am naa benn mango.', // Corrected verb to standard 'Am naa'
    },
    {
        id: 'numbers-2',
        english: 'two',
        senegal: 'ñaar',
        gambia: 'ñar',
        category: 'numbers',
        notes: 'The number takes an -i suffix (ñaari/ñari) when used to modify a noun.',
        tags: ['counting'],
        exampleSentenceEnglish: 'Give me two cups of tea.',
        exampleSentenceSenegal: 'Jox ma ñaari ataaya.', // Corrected to include linker 'i'
        exampleSentenceGambia: 'Jox ma ñari ataya.', // Corrected to include linker 'i'
    },
    {
        id: 'numbers-3',
        english: 'three',
        senegal: 'ñett',
        gambia: 'ñett',
        category: 'numbers',
        notes: 'The number takes an -i suffix (ñetti) when used to modify a noun.',
        tags: ['counting'],
    },
    {
        id: 'numbers-4',
        english: 'four',
        senegal: 'ñent',
        gambia: 'ñent',
        category: 'numbers',
        notes: 'The number takes an -i suffix (ñenti) when used to modify a noun.',
    },
    {
        id: 'numbers-5',
        english: 'five',
        senegal: 'juróom',
        gambia: 'juróom',
        category: 'numbers',
        notes: 'Juróom is the base number for counting six through nine (e.g., 5+1, 5+2).', // Corrected note
    },
    {
        id: 'numbers-6',
        english: 'six',
        senegal: 'juróom-benn',
        gambia: 'juróom-benn',
        category: 'numbers',
    },
    {
        id: 'numbers-7',
        english: 'seven',
        senegal: 'juróom-ñaar',
        gambia: 'juróom-ñar',
        category: 'numbers',
        notes: 'Literally "five two".',
    },
    {
        id: 'numbers-8',
        english: 'eight',
        senegal: 'juróom-ñett',
        gambia: 'juróom-ñett',
        category: 'numbers',
        notes: 'Literally "five three".',
    },
    {
        id: 'numbers-9',
        english: 'nine',
        senegal: 'juróom-ñent',
        gambia: 'juróom-ñent',
        category: 'numbers',
        notes: 'Literally "five four".',
    },
    {
        id: 'numbers-10',
        english: 'ten',
        senegal: 'fukk',
        gambia: 'fukk',
        category: 'numbers',
    },
    {
        id: 'numbers-11',
        english: 'twenty',
        senegal: 'ñaar fukk',
        gambia: 'ñar fukk',
        category: 'numbers',
        notes: 'Literally “two tens”.',
    },
    {
        id: 'numbers-12',
        english: 'fifty',
        senegal: 'juróom fukk', // Corrected from 70 (juróom ñaar fukk)
        gambia: 'juróom fukk', // Corrected from 70 (juróom ñar fukk)
        category: 'numbers',
        tags: ['money'],
        notes: 'Literally "five tens".',
    },
    {
        id: 'numbers-13',
        english: 'one hundred',
        senegal: 'téeméer',
        gambia: 'téeméer',
        category: 'numbers',
        exampleSentenceEnglish: 'The taxi costs one hundred francs.',
        exampleSentenceSenegal: 'Clando bi jël na téeméer franc.', // Corrected verb to 'jël na' (costs/takes)
        exampleSentenceGambia: 'Taxi bi jël na téeméer dalasi.', // Corrected verb to 'jël na' (costs/takes)
    },
]
