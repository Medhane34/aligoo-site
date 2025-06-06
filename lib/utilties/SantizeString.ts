// src/utils/sanitizeString.ts

/**
 * Sanitizes a string by replacing non-ASCII characters with ASCII equivalents or removing them.
 * @param str The input string to sanitize.
 * @returns The sanitized string with ASCII-compatible characters.
 */
export function sanitizeString(str: string): string {
  // Handle null or undefined input
  if (!str) return '';

  return str.replace(/[\u{0080}-\u{FFFF}]/gu, (char) => {
    // Replace curly quotes with straight quotes
    if (char === '\u201C' || char === '\u201D') return '"';
    if (char === '\u2018' || char === '\u2019') return "'";
    // Replace dashes
    if (char === '\u2013' || char === '\u2014') return '-';
    // Replace ellipsis
    if (char === '\u2026') return '...';
    // Remove other non-ASCII characters
    return '';
  });
}