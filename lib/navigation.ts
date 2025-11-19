export type PrimaryNavItem = {
    href: string
    label: string
    description: string
}

export const primaryNavItems: PrimaryNavItem[] = [
    { href: '/', label: 'Home', description: 'Return to the Learn Wolof overview' },
    { href: '/words', label: 'Words', description: 'Browse Wolof word lists' },
    { href: '/phrases', label: 'Phrases', description: 'Study useful Wolof sentences' },
    { href: '/alphabet', label: 'Alphabet', description: 'Master Wolof pronunciation' },
]
