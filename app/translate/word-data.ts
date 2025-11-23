import { animalsWords } from '../../data/words/animals'
import { basicWords } from '../../data/words/basic'
import { bodyWords } from '../../data/words/body'
import { colorsWords } from '../../data/words/colors'
import { familyWords } from '../../data/words/family'
import { foodWords } from '../../data/words/food'
import { numbersWords } from '../../data/words/numbers'
import { peopleWords } from '../../data/words/people'
import { placesWords } from '../../data/words/places'
import { timeWords } from '../../data/words/time'

export type WordEntry = {
    id: string
    category: string
    wolof: string
    english: string
    dialect: 'gambian' | 'senegalese' | 'both'
    pos?: string
    wolofNormalized?: string
}

// Helper to process words
const processWords = (
    words: { senegal: string; gambia: string; english: string; pos?: string; wolofNormalized?: string }[],
    category: string
): WordEntry[] => {
    return words.flatMap((w, i) => {
        const entries: WordEntry[] = []
        const baseId = `${category}-${i}`

        // If dialects are the same or only one provided (assuming same if not specified)
        if (w.senegal === w.gambia) {
            entries.push({
                id: baseId,
                category,
                wolof: w.senegal,
                english: w.english,
                dialect: 'both',
                wolofNormalized: w.senegal.toLowerCase()
            })
        } else {
            // Add Senegalese version
            if (w.senegal) {
                entries.push({
                    id: `${baseId}-sn`,
                    category,
                    wolof: w.senegal,
                    english: w.english,
                    dialect: 'senegalese',
                    wolofNormalized: w.senegal.toLowerCase()
                })
            }
            // Add Gambian version
            if (w.gambia) {
                entries.push({
                    id: `${baseId}-gm`,
                    category,
                    wolof: w.gambia,
                    english: w.english,
                    dialect: 'gambian',
                    wolofNormalized: w.gambia.toLowerCase()
                })
            }
        }
        return entries
    })
}

const allWords: WordEntry[] = [
    ...processWords(animalsWords, 'animals'),
    ...processWords(basicWords, 'basic'),
    ...processWords(bodyWords, 'body'),
    ...processWords(colorsWords, 'colors'),
    ...processWords(familyWords, 'family'),
    ...processWords(foodWords, 'food'),
    ...processWords(numbersWords, 'numbers'),
    ...processWords(placesWords, 'places'),
    ...processWords(peopleWords, 'people'),
    ...processWords(timeWords, 'time')
]

export default allWords
