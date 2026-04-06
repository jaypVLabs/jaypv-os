/**
 * Shared utility functions importable across all Wix Velo page files.
 * Import with: import { functionName } from 'public/utils'
 */

/**
 * Returns true if an element with the given selector exists on the current page.
 * In Wix Velo, $w() always returns a selector object; checking .type confirms
 * the element actually exists.
 *
 * @param {string} selector  e.g. '#myButton'
 * @returns {boolean}
 */
export function exists(selector) {
    try {
        return Boolean($w(selector).type);
    } catch (_e) {
        return false;
    }
}

/**
 * Validate that a string is a well-formed email address.
 * Rejects consecutive dots, leading/trailing dots in the local part,
 * and domains without a valid TLD.
 *
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
    if (!email || typeof email !== 'string') return false;
    // Must have exactly one @, no consecutive dots, no leading/trailing dots
    // in either part, and a TLD of at least 2 characters.
    return /^[a-zA-Z0-9]([a-zA-Z0-9._%+\-]*[a-zA-Z0-9])?@[a-zA-Z0-9]([a-zA-Z0-9\-]*[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9\-]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/.test(email)
        && !/\.\./.test(email);
}

/**
 * Format a number as a USD currency string.
 *
 * @param {number} amount
 * @returns {string}  e.g. '$12.99'
 */
export function formatCurrency(amount) {
    return `$${Number(amount).toFixed(2)}`;
}

/**
 * Capitalise the first letter of each word in a string.
 *
 * @param {string} str
 * @returns {string}
 */
export function toTitleCase(str) {
    return String(str)
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}
