export function formatTags(tags: string[] | undefined | null, fallback = 'Not specified'): string {
    if (!tags || tags.length === 0) return fallback;

    return tags
        .map(tag =>
            tag.replace(/^[a-z]{2}:/, '') // removes any lang prefix like en:, fr:, pt:
                .replace(/-/g, ' ')
                .replace(/\b\w/g, c => c.toUpperCase())
        )
        .join(', ');
}
