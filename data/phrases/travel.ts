import type { WolofPhrase } from '@/data/types'

export const travelPhrases: WolofPhrase[] = [
    {
        id: 'travel-1',
        english: 'Where is the bus station?',
        senegal: 'Fan la gare bus bi nekk?',
        gambia: 'Fan la garage bus bi nekk?', // Added 'nekk' for grammatical completeness
        category: 'travel',
        notes: 'Gambians often use “garage” for transport depots, while Senegalese use “gare” (French for station).',
        tags: ['directions'],
    },
    {
        id: 'travel-2',
        english: 'I want to go to Dakar.',
        senegal: 'Bëgg naa dem Dakar.',
        gambia: 'Begg naa dem Banjul.',
        category: 'travel',
        notes: 'Bëgg naa / Begg naa means "I want to". Swap town names as needed.',
    },
    {
        id: 'travel-3',
        english: 'How much is the ticket?',
        senegal: 'Ñaata la tiket bi?', // Simplified structure
        gambia: 'Ñaata la ticket bi?',
        category: 'travel',
        tags: ['money'],
        notes: 'Ñaata la means "How much is it?".',
    },
    {
        id: 'travel-4',
        english: 'Please stop here.',
        senegal: 'Bu la neexee, taagal fi.', // Corrected verb and politeness
        gambia: 'Bu la neexee, taagal fi.',
        category: 'travel',
        notes: 'Taagal is the correct verb for "stop/pause" (a vehicle). Bu la neexee means "please." (If it pleases you).',
    },
    {
        id: 'travel-5',
        english: 'When does it leave?',
        senegal: 'Kan la bus bi di génn?', // Standardized to "When is the bus leaving?"
        gambia: 'Kan la bus bi di génn?',
        category: 'travel',
        notes: 'Kan (when), génn (go out/leave).',
    },
    {
        id: 'travel-6',
        english: 'I am getting off at the market.',
        senegal: 'Dinaa wàcc ci marché bi.', // Corrected verb from 'toog' (sit) to 'wàcc' (get off)
        gambia: 'Dinaa wacc ci lumo bi.',
        category: 'travel',
        notes: 'Wàcc / Wacc is the verb "to get off/descend." Lumo is the Gambian word for weekly market.',
    },
]
