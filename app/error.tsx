'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function AppError({
    error: errorInfo,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(errorInfo)
    }, [errorInfo])

    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold text-destructive">Something went wrong!</h1>
            <p className="mt-4 max-w-md text-muted-foreground">
                We apologize for the inconvenience. An unexpected error has occurred.
            </p>
            <div className="mt-8 flex gap-4">
                <Button onClick={() => reset()}>Try again</Button>
                <Button asChild variant="outline">
                    <a href="/">Go Home</a>
                </Button>
            </div>
        </div>
    )
}
