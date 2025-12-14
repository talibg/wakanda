const stripDiacritics = (value: string) => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '')

export const slugifyEnglish = (value: string) => {
    const trimmed = value.trim().toLowerCase()
    const withoutApostrophes = trimmed.replace(/[’']/g, '')
    const withoutDiacritics = stripDiacritics(withoutApostrophes)
    const slug = withoutDiacritics.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

    return slug || 'phrase'
}

