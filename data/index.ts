import { diningPhrases } from '@/data/phrases/dining'
import { everydayPhrases } from '@/data/phrases/everyday'
import { farewellPhrases } from '@/data/phrases/farewells'
import { familyPhrases } from '@/data/phrases/family'
import { greetingPhrases } from '@/data/phrases/greetings'
import { healthPhrases } from '@/data/phrases/health'
import { introductionPhrases } from '@/data/phrases/introductions'
import { marketPhrases } from '@/data/phrases/market'
import { politeExpressionsPhrases } from '@/data/phrases/polite-expressions'
import { questionPhrases } from '@/data/phrases/questions'
import { romancePhrases } from '@/data/phrases/romance'
import { travelPhrases } from '@/data/phrases/travel'
import type { PhraseCategory, WolofPhrase, WolofWord, WordCategory } from '@/data/types'
import { actionsWords } from '@/data/words/actions'
import { animalsWords } from '@/data/words/animals'
import { basicWords } from '@/data/words/basic'
import { bodyWords } from '@/data/words/body'
import { colorsWords } from '@/data/words/colors'
import { coreWords } from '@/data/words/core'
import { descriptorsWords } from '@/data/words/descriptors'
import { familyWords } from '@/data/words/family'
import { foodWords } from '@/data/words/food'
import { numbersWords } from '@/data/words/numbers'
import { peopleWords } from '@/data/words/people'
import { placesWords } from '@/data/words/places'
import { timeWords } from '@/data/words/time'

export const wordCategories: { id: WordCategory; label: string; description: string }[] = [
    {
        id: 'core',
        label: 'Core Words',
        description: 'Pronouns and high-frequency building blocks for simple sentences.'
    },
    {
        id: 'actions',
        label: 'Actions (Verbs)',
        description: 'Essential verbs for building useful phrases.'
    },
    {
        id: 'descriptors',
        label: 'Descriptors (Adjectives)',
        description: 'Common adjectives for describing people, places, and things.'
    },
    {
        id: 'numbers',
        label: 'Numbers',
        description: 'Learn Wolof numbers for counting money, time, and everyday items.'
    },
    {
        id: 'family',
        label: 'Family & People',
        description: 'Talk about your relatives, friends, and the people in your household.'
    },
    {
        id: 'food',
        label: 'Food & Drink',
        description: 'Essential food vocabulary for Senegalese and Gambian meals.'
    },
    {
        id: 'basic',
        label: 'Everyday Basics',
        description: 'Greetings, polite expressions, and useful small talk phrases.'
    },
    {
        id: 'time',
        label: 'Time & Schedule',
        description: 'Words for days, hours, and talking about the moment.'
    },
    {
        id: 'animals',
        label: 'Animals & Nature',
        description: 'Common animals you might see in Senegal and The Gambia.'
    },
    {
        id: 'colors',
        label: 'Colors',
        description: 'Describe the world around you with basic color vocabulary.'
    },
    {
        id: 'places',
        label: 'Places & Directions',
        description: 'Important locations plus direction words for getting around.'
    },
    {
        id: 'body',
        label: 'Body Parts',
        description: 'Common body parts and anatomy.'
    },
    {
        id: 'people',
        label: 'People',
        description: 'Talk about people and roles you meet every day.'
    }
]

export const phraseCategories: { id: PhraseCategory; label: string; description: string }[] = [
    {
        id: 'greetings',
        label: 'Greetings',
        description: 'Start conversations the Wolof way with respectful greetings.'
    },
    {
        id: 'polite-expressions',
        label: 'Polite Expressions',
        description: 'Say thank you, please, and excuse me the Wolof way.'
    },
    {
        id: 'introductions',
        label: 'Introductions',
        description: 'Introduce yourself and ask for names or hometowns.'
    },
    {
        id: 'farewells',
        label: 'Farewells',
        description: 'Wrap up conversations with respectful goodbyes and good nights.'
    },
    {
        id: 'travel',
        label: 'Travel & Transport',
        description: 'Get around in Dakar, Thiès, Banjul or Serrekunda with confidence.'
    },
    {
        id: 'market',
        label: 'Market & Shopping',
        description: 'Negotiate prices and understand market slang.'
    },
    {
        id: 'everyday',
        label: 'Everyday Life',
        description: 'Useful sentences for your daily routines and interactions.'
    },
    {
        id: 'questions',
        label: 'Questions & Clarifications',
        description: 'Ask for directions, information, and help in Wolof.'
    },
    {
        id: 'health',
        label: 'Health & Emergency',
        description: 'Express how you feel and ask for medical help.'
    },
    {
        id: 'dining',
        label: 'Dining & Eating',
        description: 'Order food, ask for water, and compliment the chef.'
    },
    {
        id: 'family',
        label: 'Family & Social',
        description: 'Talk about your family, friends, and relationships.'
    },
    {
        id: 'romance',
        label: 'Romance & Relationships',
        description: 'Express love and affection in Wolof.'
    }
]

const wordMap: Record<WordCategory, WolofWord[]> = {
    core: coreWords,
    actions: actionsWords,
    descriptors: descriptorsWords,
    numbers: numbersWords,
    family: familyWords,
    food: foodWords,
    basic: basicWords,
    time: timeWords,
    animals: animalsWords,
    colors: colorsWords,
    places: placesWords,
    body: bodyWords,
    people: peopleWords
}

const phraseMap: Record<PhraseCategory, WolofPhrase[]> = {
    greetings: greetingPhrases,
    'polite-expressions': politeExpressionsPhrases,
    introductions: introductionPhrases,
    farewells: farewellPhrases,
    travel: travelPhrases,
    market: marketPhrases,
    everyday: everydayPhrases,
    questions: questionPhrases,
    health: healthPhrases,
    dining: diningPhrases,
    family: familyPhrases,
    romance: romancePhrases
}

export const getWordsByCategory = (category: WordCategory): WolofWord[] => {
    return wordMap[category] ?? []
}

export const getPhrasesByCategory = (category: PhraseCategory): WolofPhrase[] => {
    return phraseMap[category] ?? []
}
