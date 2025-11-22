import Link from 'next/link'

export function SiteFooter() {
    return (
        <footer className="w-full border-t border-border bg-background">
            <div className="mx-auto w-full max-w-5xl px-4 py-12">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-foreground">Explore</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li>
                                <Link href="/guides/first-ten-wolof-phrases" className="hover:text-foreground transition-colors">
                                    First 10 Wolof Phrases
                                </Link>
                            </li>
                            <li>
                                <Link href="/guides/wolof-travel-survival-guide" className="hover:text-foreground transition-colors">
                                    Travel Survival Guide
                                </Link>
                            </li>
                            <li>
                                <Link href="/words" className="hover:text-foreground transition-colors">
                                    Wolof Words
                                </Link>
                            </li>
                            <li>
                                <Link href="/phrases" className="hover:text-foreground transition-colors">
                                    Wolof Phrases
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-foreground">About</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li>
                                <Link href="/privacy" className="hover:text-foreground transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-foreground transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-foreground transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Learn Wolof. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <a
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                            href="https://github.com/talibg"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            LearnWolof by talibg
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
