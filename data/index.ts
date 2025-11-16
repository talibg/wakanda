import { everydayPhrases } from '@/data/phrases/everyday'
import { greetingPhrases } from '@/data/phrases/greetings'
import { marketPhrases } from '@/data/phrases/market'
import { questionPhrases } from '@/data/phrases/questions'
import { travelPhrases } from '@/data/phrases/travel'
import type { PhraseCategory, WolofPhrase, WolofWord, WordCategory } from '@/data/types'
import { basicWords } from '@/data/words/basic'
import { familyWords } from '@/data/words/family'
import { foodWords } from '@/data/words/food'
import { numbersWords } from '@/data/words/numbers'
import { timeWords } from '@/data/words/time'

export const wordCategories: { id: WordCategory; label: string; description: string }[] = [
    {
        id: 'numbers',
        label: 'Numbers',
        description: 'Learn Wolof numbers for counting money, time, and everyday items.',
    },
    {
        id: 'family',
        label: 'Family & People',
        description: 'Talk about your relatives, friends, and the people in your household.',
    },
    {
        id: 'food',
        label: 'Food & Drink',
        description: 'Essential food vocabulary for Senegalese and Gambian meals.',
    },
    {
        id: 'basic',
        label: 'Everyday Basics',
        description: 'Greetings, polite expressions, and useful small talk phrases.',
    },
    {
        id: 'time',
        label: 'Time & Schedule',
        description: 'Words for days, hours, and talking about the moment.',
    },
]

export const phraseCategories: { id: PhraseCategory; label: string; description: string }[] = [
    {
        id: 'greetings',
        label: 'Greetings & Introductions',
        description: 'Start conversations the Wolof way with respectful greetings.',
    },
    {
        id: 'travel',
        label: 'Travel & Transport',
        description: 'Get around in Dakar, Thiès, Banjul or Serrekunda with confidence.',
    },
    {
        id: 'market',
        label: 'Market & Shopping',
        description: 'Negotiate prices and understand market slang.',
    },
    {
        id: 'everyday',
        label: 'Everyday Life',
        description: 'Useful sentences for your daily routines and interactions.',
    },
    {
        id: 'questions',
        label: 'Questions & Clarifications',
        description: 'Ask for directions, information, and help in Wolof.',
    },
]

const wordMap: Record<WordCategory, WolofWord[]> = {
    numbers: numbersWords,
    family: familyWords,
    food: foodWords,
    basic: basicWords,
    time: timeWords,
}

const phraseMap: Record<PhraseCategory, WolofPhrase[]> = {
    greetings: greetingPhrases,
    travel: travelPhrases,
    market: marketPhrases,
    everyday: everydayPhrases,
    questions: questionPhrases,
}

export const getWordsByCategory = (category: WordCategory): WolofWord[] => {
    return wordMap[category] ?? []
}

export const getPhrasesByCategory = (category: PhraseCategory): WolofPhrase[] => {
    return phraseMap[category] ?? []
}
