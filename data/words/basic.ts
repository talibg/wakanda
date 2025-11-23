import type { WolofWord } from '@/data/types'

export const basicWords: WolofWord[] = [
    {
        id: 'basic-1',
        english: 'yes',
        senegal: 'waaw',
        gambia: 'waaw',
        category: 'basic',
        tags: ['polite'],
        exampleSentenceEnglish: 'Yes, I understand.',
        exampleSentenceSenegal: 'Waaw, dégg naa.',
        exampleSentenceGambia: 'Waaw, dégg naa.'
    },
    {
        id: 'basic-2',
        english: 'no',
        senegal: 'déedéet',
        gambia: 'dedet',
        category: 'basic',
        notes: 'Senegalese speakers emphasize the long vowels (déedéet). Gambian spelling is often simplified.',
        exampleSentenceEnglish: "No, I don't want it.",
        exampleSentenceSenegal: 'Déedéet, bëgguma ko.',
        exampleSentenceGambia: 'Dedet, bëgguma ko.'
    },
    {
        id: 'basic-3',
        english: 'please',
        senegal: 'bu la neexee',
        gambia: 'bu la neekhee',
        category: 'basic',
        notes: 'Literally "if it pleases you". Used when making a request.',
        exampleSentenceEnglish: 'Please wait for me.',
        exampleSentenceSenegal: 'Bu la neexee, xaar ma.',
        exampleSentenceGambia: 'Bu la neekhee, haar ma.'
    },
    {
        id: 'basic-4',
        english: 'thank you',
        senegal: 'jërëjëf',
        gambia: 'jerrejef',
        category: 'basic',
        tags: ['polite'],
        notes: 'Spelling often differs, but pronunciation is similar. The "ë" is a central vowel.',
        exampleSentenceEnglish: 'Thank you very much.',
        exampleSentenceSenegal: 'Jërëjëf bu baax.',
        exampleSentenceGambia: 'Jerrejef bu baakh.'
    },
    {
        id: 'basic-5',
        english: 'sorry',
        senegal: 'baal ma',
        gambia: 'baal ma',
        category: 'basic',
        notes: 'Means "forgive me" or "excuse me". Can be used before a request, like "Excuse me, ..."',
        exampleSentenceEnglish: 'Sorry, I am late.',
        exampleSentenceSenegal: 'Baal ma, dama yéex.',
        exampleSentenceGambia: 'Baal ma, dama yéex.'
    },
    {
        id: 'basic-6',
        english: 'hello',
        senegal: 'salaam aleekum',
        gambia: 'salaam aleekum',
        category: 'basic',
        tags: ['greeting'],
        notes: 'The universal Arabic greeting "peace be with you". The reply is "maleekum salaam". "Nanga def?" (How are you?) is also very common as a first greeting.',
        exampleSentenceEnglish: 'Hello, how are you?',
        exampleSentenceSenegal: 'Salaam aleekum, nanga def?',
        exampleSentenceGambia: 'Salaam aleekum, nanga def?'
    },
    {
        id: 'basic-7',
        english: 'goodbye',
        senegal: 'ba beneen yoon',
        gambia: 'ba beneen yoon',
        category: 'basic',
        notes: 'Literally “until another time”. Also common: "mangi dem" (I am going).',
        exampleSentenceEnglish: 'Goodbye, see you soon.',
        exampleSentenceSenegal: 'Ba beneen yoon, ci lu gàtt.',
        exampleSentenceGambia: 'Ba beneen yoon, chi lu gatt.'
    },
    {
        id: 'basic-8',
        english: 'welcome',
        senegal: 'agsil',
        gambia: 'agsil',
        category: 'basic',
        notes: 'Means "come in" or "arrive". Use "agsileen" for a group. "Dalal-jamm" (host in peace) is also common.',
        exampleSentenceEnglish: 'Welcome to my house.',
        exampleSentenceSenegal: 'Agsil ci sama kër.',
        exampleSentenceGambia: 'Agsil chi sama ker.'
    },
    {
        id: 'basic-9',
        english: 'help',
        senegal: 'ndimbal',
        gambia: 'ndimbal',
        category: 'basic',
        notes: 'This is the noun "help". The verb is "dimbali".',
        exampleSentenceEnglish: 'Help me!',
        exampleSentenceSenegal: 'Dimbali ma!',
        exampleSentenceGambia: 'Dimbali ma!'
    },
    {
        id: 'basic-10',
        english: 'hospitality',
        senegal: 'teranga',
        gambia: 'teranga',
        category: 'basic',
        notes: 'Teranga is the famous Wolof value of hospitality and generosity.',
        exampleSentenceEnglish: 'Senegal is the land of hospitality.',
        exampleSentenceSenegal: 'Senegal mooy réewum teranga.',
        exampleSentenceGambia: 'Senegal mooy réewum teranga.'
    },
    {
        id: 'jotna',
        english: 'enough',
        senegal: 'jotna',
        gambia: 'jotna',
        category: 'basic',
        notes: 'Often written as two words “jot na” in grammar explanations. Used to say something is sufficient.',
        tags: ['expression'],
        exampleSentenceEnglish: 'That is enough.',
        exampleSentenceSenegal: 'Lii jotna.',
        exampleSentenceGambia: 'Lii jotna.'
    }
]
