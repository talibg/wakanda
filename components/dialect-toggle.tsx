'use client'

import { useDialect } from '@/context/dialect-context'
import { cn } from '@/lib/utils'

const options = [
    { value: 'both', label: 'Both' },
    { value: 'senegal', label: 'Senegal 🇸🇳' },
    { value: 'gambia', label: 'Gambia 🇬🇲' },
] as const

export function DialectToggle() {
    const { mode, setMode } = useDialect()

    return (
        <div className="inline-flex gap-1 rounded-full border border-border bg-muted/40 p-1 text-xs font-semibold">
            {options.map((option) => (
                <button
                    aria-pressed={mode === option.value}
                    className={cn(
                        'rounded-full px-3 py-1 transition-colors',
                        mode === option.value
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'text-muted-foreground hover:text-foreground',
                    )}
                    key={option.value}
                    onClick={() => setMode(option.value)}
                    type="button"
                >
                    {option.label}
                </button>
            ))}
        </div>
    )
}
