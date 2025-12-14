export type WordCategory =
    | 'core'
    | 'actions'
    | 'descriptors'
    | 'numbers'
    | 'family'
    | 'food'
    | 'basic'
    | 'time'
    | 'animals'
    | 'colors'
    | 'places'
    | 'body'
    | 'people'

export type PhraseCategory =
    | 'greetings'
    | 'polite-expressions'
    | 'introductions'
    | 'farewells'
    | 'travel'
    | 'market'
    | 'everyday'
    | 'questions'
    | 'health'
    | 'dining'
    | 'family'
    | 'romance'

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
