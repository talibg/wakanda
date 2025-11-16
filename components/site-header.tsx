import Link from 'next/link'

import { DialectToggle } from '@/components/dialect-toggle'
import { PrimaryNavMenu } from '@/components/primary-nav'
import { ThemeToggle } from '@/components/theme-toggle'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
    SidebarTrigger,
} from '@/components/ui/sidebar'
import { primaryNavItems } from '@/lib/navigation'

export function SiteHeader() {
    return (
        <header className="border-b border-border bg-card/80 backdrop-blur">
            <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-4 px-4 py-6">
                <div className="flex flex-1 items-center gap-3">
                    <SidebarTrigger className="md:hidden" />
                    <Link className="space-y-1" href="/">
                        <p className="text-xl font-semibold tracking-tight text-primary">LearnWolof.com</p>
                        <p className="text-sm text-muted-foreground">Learn Wolof from Senegal and The Gambia</p>
                    </Link>
                </div>
                <PrimaryNavMenu />
                <div className="flex items-center gap-3">
                    <DialectToggle />
                    <ThemeToggle />
                </div>
            </div>
        </header>
    )
}

export function MobileNavSidebar() {
    return (
        <Sidebar className="md:hidden" collapsible="offcanvas" side="left">
            <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
                <Link className="space-y-1" href="/">
                    <p className="text-lg font-semibold text-sidebar-foreground">LearnWolof.com</p>
                    <p className="text-sm text-sidebar-foreground/70">Senegal + Gambia dialect lessons</p>
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigate</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {primaryNavItems.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.href}>{item.label}</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarSeparator />
                <SidebarGroup>
                    <SidebarGroupLabel>Preferences</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <div className="flex items-center gap-3 px-2 py-2">
                            <DialectToggle />
                            <ThemeToggle />
                        </div>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="px-4 pb-4 text-xs text-sidebar-foreground/70">
                Learn Wolof with clear dialect comparisons.
            </SidebarFooter>
        </Sidebar>
    )
}
