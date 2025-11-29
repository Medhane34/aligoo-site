
// Generate a short, random ID (e.g., 6 characters long)
export const generateUniqueCode = (length: number = 6): string => {
    // Define the characters to use in the short code (alphanumeric, excluding visually similar chars like 'l', '1', 'O', '0')
    const characters = 'abcdefghijkmnpqrstuvwxyz23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
};

/**
 * Custom initial value function to be used in the schema.
 * It ensures a new code is generated every time a document is created.
 * @returns A promise resolving to the generated unique code string.
 */
export const getInitialUniqueCode = (): Promise<string> => {
    // Use a promise to simulate any asynchronous checks you might want to add later
    return new Promise((resolve) => {
        resolve(generateUniqueCode(6)); // Generates a 6-character code
    });
};