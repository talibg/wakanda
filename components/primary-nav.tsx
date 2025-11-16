'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { primaryNavItems } from '@/lib/navigation'
import { cn } from '@/lib/utils'

const isActivePath = (pathname: string, href: string) => {
    if (href === '/') {
        return pathname === '/'
    }
    return pathname.startsWith(href)
}

export function PrimaryNavMenu() {
    const pathname = usePathname()

    return (
        <NavigationMenu className="hidden flex-1 justify-center md:flex">
            <NavigationMenuList>
                {primaryNavItems.map((item) => {
                    const active = isActivePath(pathname, item.href)
                    return (
                        <NavigationMenuItem key={item.href} value={item.href}>
                            <NavigationMenuLink asChild data-active={active}>
                                <Link
                                    className={cn(
                                        'rounded-md px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
                                        active && 'bg-accent text-accent-foreground',
                                    )}
                                    href={item.href}
                                >
                                    {item.label}
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    )
                })}
            </NavigationMenuList>
        </NavigationMenu>
    )
}
