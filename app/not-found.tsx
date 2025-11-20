import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
            <h1 className="text-6xl font-bold text-primary">404</h1>
            <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
            <p className="mt-4 max-w-md text-muted-foreground">
                Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
            </p>
            <div className="mt-8 flex gap-4">
                <Button asChild>
                    <Link href="/">Go Home</Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href="/words">Browse Words</Link>
                </Button>
            </div>
        </div>
    )
}
