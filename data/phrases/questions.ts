import type { WolofPhrase } from '@/data/types'

export const questionPhrases: WolofPhrase[] = [
    {
        id: 'questions-where-from',
        english: 'Where are you from?',
        senegal: 'Fan nga joge?',
        gambia: 'Fo nga joge?',
        category: 'questions',
        tags: ['introductions']
    },
    {
        id: 'questions-1',
        english: 'What is your name?',
        senegal: 'Nanga tudd?', // Corrected to the standard question form
        gambia: 'Nanga tudd?',
        category: 'questions',
        tags: ['introductions'],
        notes: 'Literally "How are you called?". The reply is often "Maa ngi tudd [name]." or "[Name] laa."'
    },
    {
        id: 'questions-2',
        english: 'Where do you live?',
        senegal: 'Fan ngay dëkk?',
        gambia: 'Fan nga dekk?',
        category: 'questions',
        notes: 'Fan (where), ngay/nga (you are), dëkk/dekk (live).'
    },
    {
        id: 'questions-3',
        english: 'Where are you going?',
        senegal: 'Fan ngay dem?',
        gambia: 'Fan nga dem?',
        category: 'questions',
        notes: 'Common street greeting to strangers. Fan (where), dem (go).'
    },
    {
        id: 'questions-4',
        english: 'What time is it?',
        senegal: 'Ñaata waxtu la?', // Corrected grammar (removed 'nga')
        gambia: 'Ñaata wahtu la?',
        category: 'questions',
        tags: ['time'],
        notes: 'Literally "How many hours is it?".'
    },
    {
        id: 'questions-5',
        english: 'Can you help me?',
        senegal: 'Mën nga ma dimbali?', // Corrected to use the modal verb "can"
        gambia: 'Mën nga ma dimbali?',
        category: 'questions',
        notes: 'Mën nga (Can you), ma (me), dimbali (help).'
    },
    {
        id: 'questions-how-much',
        english: 'How much is this?',
        senegal: 'Ñaata la?',
        gambia: 'Ñaata la?',
        category: 'questions',
        tags: ['money']
    },
    {
        id: 'questions-where-is',
        english: 'Where is ...?',
        senegal: 'Ana ...?',
        gambia: 'Ana ...?',
        category: 'questions',
        notes: 'Replace the ellipsis with the place or thing you are looking for.'
    }
]
