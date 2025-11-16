'use client'

import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

export type WolofDialectMode = 'both' | 'senegal' | 'gambia'

type DialectContextValue = {
    mode: WolofDialectMode
    setMode: (mode: WolofDialectMode) => void
}

const DialectContext = createContext<DialectContextValue | undefined>(undefined)

const storageKey = 'wolof-dialect-mode'

export function DialectProvider({ children }: { children: ReactNode }) {
    const [mode, setMode] = useState<WolofDialectMode>('both')

    useEffect(() => {
        const stored = typeof window === 'undefined' ? null : window.localStorage.getItem(storageKey)
        if (stored === 'both' || stored === 'senegal' || stored === 'gambia') {
            setMode(stored)
        }
    }, [])

    useEffect(() => {
        if (typeof window === 'undefined') return
        window.localStorage.setItem(storageKey, mode)
    }, [mode])

    return <DialectContext.Provider value={{ mode, setMode }}>{children}</DialectContext.Provider>
}

export function useDialect() {
    const context = useContext(DialectContext)
    if (!context) {
        throw new Error('useDialect must be used inside DialectProvider')
    }
    return context
}
