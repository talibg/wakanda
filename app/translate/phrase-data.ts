import { diningPhrases } from '../../data/phrases/dining'
import { everydayPhrases } from '../../data/phrases/everyday'
import { greetingPhrases } from '../../data/phrases/greetings'
import { healthPhrases } from '../../data/phrases/health'
import { introductionPhrases } from '../../data/phrases/introductions'
import { marketPhrases } from '../../data/phrases/market'
import { questionPhrases } from '../../data/phrases/questions'
import { romancePhrases } from '../../data/phrases/romance'
import { travelPhrases } from '../../data/phrases/travel'

export type PhraseEntry = {
    id: string
    category: string
    wolof: string
    english: string
    dialect?: 'gambian' | 'senegalese' | 'both'
}

// Helper to process phrases
const processPhrases = (
    phrases: { senegal: string; gambia: string; english: string }[],
    category: string
): PhraseEntry[] => {
    return phrases.flatMap((p, i) => {
        const entries: PhraseEntry[] = []
        const baseId = `${category}-${i}`

        // If dialects are the same or only one provided (assuming same if not specified)
        if (p.senegal === p.gambia) {
            entries.push({
                id: baseId,
                category,
                wolof: p.senegal,
                english: p.english,
                dialect: 'both'
            })
        } else {
            // Add Senegalese version
            if (p.senegal) {
                entries.push({
                    id: `${baseId}-sn`,
                    category,
                    wolof: p.senegal,
                    english: p.english,
                    dialect: 'senegalese'
                })
            }
            // Add Gambian version
            if (p.gambia) {
                entries.push({
                    id: `${baseId}-gm`,
                    category,
                    wolof: p.gambia,
                    english: p.english,
                    dialect: 'gambian'
                })
            }
        }
        return entries
    })
}

const allPhrases: PhraseEntry[] = [
    ...processPhrases(diningPhrases, 'dining'),
    ...processPhrases(everydayPhrases, 'everyday'),
    ...processPhrases(greetingPhrases, 'greetings'),
    ...processPhrases(introductionPhrases, 'introductions'),
    ...processPhrases(healthPhrases, 'health'),
    ...processPhrases(marketPhrases, 'market'),
    ...processPhrases(questionPhrases, 'questions'),
    ...processPhrases(romancePhrases, 'romance'),
    ...processPhrases(travelPhrases, 'travel')
]

export default allPhrases
