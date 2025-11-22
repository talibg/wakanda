export function buildCanonicalUrl(pathname: string): string {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://learnwolof.com'
    const cleanPathname = pathname === '/' ? '' : pathname
    return `${siteUrl}${cleanPathname}`
}
