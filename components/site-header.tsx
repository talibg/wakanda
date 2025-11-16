import Link from 'next/link'

import { DialectToggle } from '@/components/dialect-toggle'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'

export function SiteHeader() {
    return (
        <header className="border-b border-border bg-card/80 backdrop-blur">
            <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-xl font-semibold tracking-tight text-primary">LearnWolof.com</p>
                    <p className="text-sm text-muted-foreground">Learn Wolof from Senegal and The Gambia</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <nav className="flex gap-2">
                        <Button asChild variant="ghost">
                            <Link href="/words">Words</Link>
                        </Button>
                        <Button asChild variant="ghost">
                            <Link href="/phrases">Phrases</Link>
                        </Button>
                    </nav>
                    <DialectToggle />
                    <ThemeToggle />
                </div>
            </div>
        </header>
    )
}
