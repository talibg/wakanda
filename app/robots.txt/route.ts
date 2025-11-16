const body = `User-agent: *
Allow: /
Sitemap: https://learnwolof.com/sitemap.xml`

export function GET() {
    return new Response(body, {
        headers: {
            'Content-Type': 'text/plain',
        },
    })
}
