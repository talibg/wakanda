import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { getCanonicalPhraseLeafPath } from '@/lib/phrase-seo'

const normalizePathname = (pathname: string) => {
    if (pathname === '/') return '/'
    return pathname.replace(/\/+$/, '')
}

export const proxy = (request: NextRequest) => {
    const pathname = normalizePathname(request.nextUrl.pathname)

    if (pathname === '/words/basic' || pathname.startsWith('/words/basic/')) {
        const url = request.nextUrl.clone()
        url.pathname = '/words/core'
        return NextResponse.redirect(url, 301)
    }

    if (!pathname.startsWith('/phrases/')) return NextResponse.next()

    const segments = pathname.split('/').filter(Boolean)
    if (segments.length !== 3) return NextResponse.next()

    const category = segments[1]
    const slug = segments[2]
    const canonicalPath = getCanonicalPhraseLeafPath({ category, slug })

    if (!canonicalPath) return NextResponse.next()
    if (canonicalPath === pathname) return NextResponse.next()

    const url = request.nextUrl.clone()
    url.pathname = canonicalPath

    return NextResponse.redirect(url, 301)
}

export const config = {
    matcher: ['/phrases/:path*', '/words/basic', '/words/basic/:path*']
}
