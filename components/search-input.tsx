'use client'

import { Search } from 'lucide-react'
import type { ChangeEvent } from 'react'

import { Input } from '@/components/ui/input'

type SearchInputProps = {
    value: string
    onChange: (value: string) => void
    placeholder: string
}

export function SearchInput({ value, onChange, placeholder }: SearchInputProps) {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value)
    }

    return (
        <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-10" onChange={handleChange} placeholder={placeholder} value={value} />
        </div>
    )
}
