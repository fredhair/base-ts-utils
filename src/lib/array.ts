export function populatedArray<T = unknown>(count: number, element: T | ((index: number) => T)): T[] {
    if (element instanceof Function) {
        return [...Array(count)].map((_, index) => element(index));
    }
    return Array(count).fill(element);
}

export function extractMap<T extends Record<string, unknown>, K extends keyof T>(array: readonly T[], ...keys: K[]): Pick<T, K>[] {
    return array.map(value => keys.reduce((prev, current) => ({ ...prev, [current]: value[current] }), {} as Pick<T, K>));
}