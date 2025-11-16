import type { WolofPhrase } from '@/data/types'

export const marketPhrases: WolofPhrase[] = [
    {
        id: 'market-1',
        english: 'How much is this?',
        senegal: 'Ñaata la?', // Standardized to universal form
        gambia: 'Ñaata la?',
        category: 'market',
        tags: ['bargaining'],
        notes: 'Literally "How much is it?"',
    },
    {
        id: 'market-2',
        english: 'It is expensive.',
        senegal: 'Dafa seer.', // Corrected from "yërmandee" (pity)
        gambia: 'Dafa seer.',
        category: 'market',
        notes: 'The word "seer" means expensive or hard/difficult (to afford).',
    },
    {
        id: 'market-3',
        english: 'Can you reduce the price?',
        senegal: 'Mën nga ci waññi?', // Corrected using the verb "to reduce"
        gambia: 'Mën nga ci waññi?',
        category: 'market',
        tags: ['bargaining'],
        notes: 'Literally "Can you reduce from it?" Waññi is the verb "to reduce/deduct".',
    },
    {
        id: 'market-4',
        english: 'I will buy it.',
        senegal: 'Dinaa jënd ko.',
        gambia: 'Dinaa jend ko.',
        category: 'market',
        notes: 'Uses the future tense marker "dinaa". Jënd/Jend means "to buy".',
    },
    {
        id: 'market-5',
        english: 'I am just looking.',
        senegal: 'Maa ngi xool rekk.', // Corrected to standard continuous tense
        gambia: 'Maa ngi seet rekk.',
        category: 'market',
        tags: ['polite'],
        notes: 'Xool (Senegal) means "to look". Seet (Gambia) means "to search/check".',
    },
    {
        id: 'market-6',
        english: 'Do you have change?',
        senegal: 'Am nga monéet?', // Corrected to the standard Wolof/French loanword
        gambia: 'Am nga monéet?',
        category: 'market',
        notes: 'Monéet (from French "monnaie") is the most common word for small change/currency.',
    },
]
