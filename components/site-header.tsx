'use client'

import { Menu } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { DialectToggle } from '@/components/dialect-toggle'
import { PrimaryNavMenu } from '@/components/primary-nav'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { primaryNavItems } from '@/lib/navigation'

export function SiteHeader() {
    return (
        <header className="border-b border-border bg-card/80 backdrop-blur">
            <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-4 px-4 py-6">
                <div className="flex flex-1 items-center gap-3">
                    <MobileNav />
                    <Link className="space-y-1" href="/">
                        <p className="text-xl font-semibold tracking-tight text-primary">LearnWolof.com</p>
                        <p className="text-sm text-muted-foreground">Learn Wolof from Senegal and The Gambia</p>
                    </Link>
                </div>
                <PrimaryNavMenu />
                <div className="hidden items-center gap-3 md:flex">
                    <DialectToggle />
                    <ThemeToggle />
                </div>
            </div>
        </header>
    )
}

function MobileNav() {
    const [open, setOpen] = useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader className="border-b pb-4">
                    <SheetTitle>
                        <Link href="/" onClick={() => setOpen(false)}>
                            LearnWolof.com
                        </Link>
                    </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 py-4">
                    <nav className="flex flex-col gap-2">
                        {primaryNavItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                    <div className="flex items-center gap-3 border-t pt-4">
                        <DialectToggle />
                        <ThemeToggle />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
