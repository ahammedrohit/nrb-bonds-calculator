export function containsDuplicates(values: any[]): boolean {
    if (values.length !== new Set(values).size) {
        return true;
    }
    return false;
}