'use client'

import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'

const modes = ['light', 'dark', 'system'] as const
type ThemeMode = (typeof modes)[number]

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const activeMode = useMemo<ThemeMode>(() => {
        if (!mounted) return 'system'
        return modes.includes(theme as ThemeMode) ? (theme as ThemeMode) : 'system'
    }, [mounted, theme])

    const handleToggle = () => {
        const index = modes.indexOf(activeMode)
        const nextMode = modes[(index + 1) % modes.length]
        setTheme(nextMode)
    }

    const icon = {
        light: <Sun className="h-4 w-4" />,
        dark: <Moon className="h-4 w-4" />,
        system: <Monitor className="h-4 w-4" />,
    }[activeMode]

    return (
        <Button
            onClick={handleToggle}
            size="icon"
            title={`Switch theme (current: ${activeMode})`}
            type="button"
            variant="ghost"
        >
            {icon}
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
