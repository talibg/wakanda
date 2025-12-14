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
import type { PhraseCategory as PhraseCategorySlug, WolofPhrase } from '@/data/types'

export type PhraseItem = WolofPhrase

export type PhraseCategory = {
    slug: PhraseCategorySlug
    title: string
    description: string
    items: PhraseItem[]
}

const phrasesByCategory: Record<PhraseCategorySlug, PhraseItem[]> = {
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

export const phraseCategories: PhraseCategory[] = [
    {
        slug: 'greetings',
        title: 'Greetings',
        description: 'Start conversations the Wolof way with respectful greetings.',
        items: phrasesByCategory.greetings
    },
    {
        slug: 'polite-expressions',
        title: 'Polite Expressions',
        description: 'Say thank you, please, and excuse me the Wolof way.',
        items: phrasesByCategory['polite-expressions']
    },
    {
        slug: 'introductions',
        title: 'Introductions',
        description: 'Introduce yourself, ask for names, and share where you are from.',
        items: phrasesByCategory.introductions
    },
    {
        slug: 'farewells',
        title: 'Farewells',
        description: 'Wrap up conversations with respectful goodbyes and good nights.',
        items: phrasesByCategory.farewells
    },
    {
        slug: 'travel',
        title: 'Travel & Transport',
        description: 'Get around in Dakar, Thiès, Banjul or Serrekunda with confidence.',
        items: phrasesByCategory.travel
    },
    {
        slug: 'market',
        title: 'Market & Shopping',
        description: 'Negotiate prices and understand market slang.',
        items: phrasesByCategory.market
    },
    {
        slug: 'everyday',
        title: 'Everyday Life',
        description: 'Useful sentences for your daily routines and interactions.',
        items: phrasesByCategory.everyday
    },
    {
        slug: 'questions',
        title: 'Questions & Clarifications',
        description: 'Ask for directions, information, and help in Wolof.',
        items: phrasesByCategory.questions
    },
    {
        slug: 'health',
        title: 'Health & Emergency',
        description: 'Express how you feel and ask for medical help.',
        items: phrasesByCategory.health
    },
    {
        slug: 'dining',
        title: 'Dining & Eating',
        description: 'Order food, ask for water, and compliment the chef.',
        items: phrasesByCategory.dining
    },
    {
        slug: 'family',
        title: 'Family & Social',
        description: 'Talk about your family, friends, and relationships.',
        items: phrasesByCategory.family
    },
    {
        slug: 'romance',
        title: 'Romance & Relationships',
        description: 'Express love and affection in Wolof.',
        items: phrasesByCategory.romance
    }
]

export const findPhraseCategory = (slug: string): PhraseCategory | undefined => {
    return phraseCategories.find((category) => category.slug === slug)
}

export const getPhraseSlugs = (): PhraseCategorySlug[] => {
    return phraseCategories.map((category) => category.slug)
}
