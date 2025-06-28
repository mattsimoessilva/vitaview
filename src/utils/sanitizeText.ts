export function sanitizeText(input: string | null | undefined): string {
    if (!input) return 'Not listed';

    return input
        .normalize('NFC') // Normalize Unicode (e.g., é, ç)
        .replace(/\*+/g, '') // Remove asterisks like ***
        .replace(/[\u201C\u201D]/g, '"') // Replace curly quotes with straight quotes
        .trim();
}
