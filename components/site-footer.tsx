import Link from "next/link";

export function SiteFooter() {
    return (
        <footer className="w-full border-t border-border bg-background">
            <div className="mx-auto w-full max-w-5xl px-4 py-6">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <Link
                            href="/privacy"
                            className="hover:text-foreground transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms"
                            className="hover:text-foreground transition-colors"
                        >
                            Terms of Service
                        </Link>
                        <Link
                            href="/contact"
                            className="hover:text-foreground transition-colors"
                        >
                            Contact
                        </Link>
                    </div>
                    <div className="flex items-center justify-center text-sm text-muted-foreground">
                        <a
                            className="hover:text-foreground transition-colors"
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
    );
}
