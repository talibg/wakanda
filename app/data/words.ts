import type { WolofWord, WordCategory as WordCategorySlug } from '@/data/types'
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

export type WordItem = WolofWord

export type WordCategory = {
    slug: WordCategorySlug
    title: string
    description: string
    items: WordItem[]
}

const wordsByCategory: Record<WordCategorySlug, WordItem[]> = {
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

export const wordCategories: WordCategory[] = [
    {
        slug: 'core',
        title: 'Core Words',
        description: 'Pronouns and high-frequency building blocks for simple sentences.',
        items: wordsByCategory.core
    },
    {
        slug: 'actions',
        title: 'Actions (Verbs)',
        description: 'Essential verbs for building useful phrases.',
        items: wordsByCategory.actions
    },
    {
        slug: 'descriptors',
        title: 'Descriptors (Adjectives)',
        description: 'Common adjectives for describing people, places, and things.',
        items: wordsByCategory.descriptors
    },
    {
        slug: 'numbers',
        title: 'Numbers',
        description: 'Learn Wolof numbers for counting money, time, and everyday items.',
        items: wordsByCategory.numbers
    },
    {
        slug: 'family',
        title: 'Family & People',
        description: 'Talk about your relatives, friends, and the people in your household.',
        items: wordsByCategory.family
    },
    {
        slug: 'food',
        title: 'Food & Drink',
        description: 'Essential food vocabulary for Senegalese and Gambian meals.',
        items: wordsByCategory.food
    },
    {
        slug: 'basic',
        title: 'Everyday Basics',
        description: 'Greetings, polite expressions, and useful small talk phrases.',
        items: wordsByCategory.basic
    },
    {
        slug: 'time',
        title: 'Time & Schedule',
        description: 'Words for days, hours, and talking about the moment.',
        items: wordsByCategory.time
    },
    {
        slug: 'animals',
        title: 'Animals & Nature',
        description: 'Common animals you might see in Senegal and The Gambia.',
        items: wordsByCategory.animals
    },
    {
        slug: 'colors',
        title: 'Colors',
        description: 'Describe the world around you with basic color vocabulary.',
        items: wordsByCategory.colors
    },
    {
        slug: 'places',
        title: 'Places & Directions',
        description: 'Important locations plus direction words for getting around.',
        items: wordsByCategory.places
    },
    {
        slug: 'body',
        title: 'Body Parts',
        description: 'Common body parts and anatomy.',
        items: wordsByCategory.body
    },
    {
        slug: 'people',
        title: 'People',
        description: 'Talk about people, friends, and roles in the community.',
        items: wordsByCategory.people
    }
]

export const findWordCategory = (slug: string): WordCategory | undefined => {
    return wordCategories.find((category) => category.slug === slug)
}

export const getWordSlugs = (): WordCategorySlug[] => {
    return wordCategories.map((category) => category.slug)
}
