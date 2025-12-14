import { phraseCategories } from '@/app/data/phrases'
import { wordCategories } from '@/app/data/words'

type EnglishToWolofSnippet = {
    english: string
    senegal: string
    gambia: string
    kind: 'word' | 'phrase'
    category: string
}

const normalizeEnglish = (value: string) => value.trim().toLowerCase().replace(/\s+/g, ' ')

export const getEnglishToWolofSnippet = (english: string): EnglishToWolofSnippet | undefined => {
    const normalizedEnglish = normalizeEnglish(english)

    for (const category of phraseCategories) {
        for (const phrase of category.items) {
            if (normalizeEnglish(phrase.english) !== normalizedEnglish) continue

            return {
                english: phrase.english,
                senegal: phrase.senegal,
                gambia: phrase.gambia,
                kind: 'phrase',
                category: category.slug
            }
        }
    }

    for (const category of wordCategories) {
        for (const word of category.items) {
            if (normalizeEnglish(word.english) !== normalizedEnglish) continue

            return {
                english: word.english,
                senegal: word.senegal,
                gambia: word.gambia,
                kind: 'word',
                category: category.slug
            }
        }
    }

    return undefined
}

export const formatDialectSnippet = ({ senegal, gambia }: { senegal: string; gambia: string }) => {
    if (normalizeEnglish(senegal) === normalizeEnglish(gambia)) return senegal

    return `${senegal} (Senegal) / ${gambia} (Gambia)`
}
