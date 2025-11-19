export type WordCategory = 'numbers' | 'family' | 'food' | 'basic' | 'time'

export type PhraseCategory = 'greetings' | 'travel' | 'market' | 'everyday' | 'questions'

export type WolofWord = {
    id: string
    english: string
    senegal: string
    gambia: string
    category: WordCategory
    notes?: string
    tags?: string[]
    exampleSentenceEnglish?: string
    exampleSentenceSenegal?: string
    exampleSentenceGambia?: string
}

export type WolofPhrase = {
    id: string
    english: string
    senegal: string
    gambia: string
    category: PhraseCategory
    notes?: string
    tags?: string[]
}

export type WolofLetter = {
    id: string
    letter: string
    letterGambia?: string
    pronunciation: string
    pronunciationGambia?: string
    soundsLike: string
    soundsLikeGambia?: string
    exampleWord?: string
    exampleTranslation?: string
    dialect?: 'senegal' | 'gambia'
}
