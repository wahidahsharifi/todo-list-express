// Simple validator for todo input
export function validateTodoInput(input: any): { valid: boolean; error?: string } {
    if (
        typeof input !== 'object' ||
        input === null ||
        typeof input.title !== 'string' ||
        typeof input.body !== 'string'
    ) {
        return {
            valid: false,
            error: 'Input must be a JSON object with string properties: title and body.'
        };
    }
    return { valid: true };
}
