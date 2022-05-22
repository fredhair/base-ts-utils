import { IUtilityArray } from "../types/array";

export class UtilityArray<T> extends Array<T> implements IUtilityArray<T> {
    /**
     * Used to construct and fill an array with a convenient generator callback syntax
     * 
     * @param count The number of elements to create
     * @param element A static object to be copied or a generator function that takes in the index and returns an object
     */
    static populate<U>(count: number, element: U | ((index: number) => U)): UtilityArray<U> {
        if (element instanceof Function) {
            return new UtilityArray<U>(...[...Array(count)].map((_, index) => element(index)));
        }
        return new UtilityArray<U>(count).fill(element);
    }

    get last(): T | undefined {
        return this.at(-1);
    }

    set last(value: T | undefined) {
        if (this.length && value !== undefined) {
            this[this.length - 1] = value;
        }
    }

    replaceAt(index: number, value: T): T | undefined {
        return this.splice(index, 1, value)?.[0];
    }
    removeAt(index: number): T | undefined {
        return this.splice(index, 1)?.[0];
    }

    extractMap<U extends Record<string, unknown>, K extends keyof U>(this: IUtilityArray<U>, ...keys: K[]): Pick<U, K>[] {
        return this.map(value => keys.reduce((prev, current) => ({ ...prev, [current]: value[current] }), {} as Pick<U, K>));
    }

    findBy<U extends Record<string, unknown>, K extends keyof U>(this: IUtilityArray<U>, key: K, value: typeof this[number][typeof key]): U | undefined {
        return this.find(({ [key]: needle }) => needle === value);
    }

    findIndexBy<U extends Record<string, unknown>, K extends keyof U>(this: IUtilityArray<U>, key: K, value: U[K]): number {
        return this.findIndex(({ [key]: needle }) => needle === value);
    }

}

export function populatedArray<T = unknown>(count: number, element: T | ((index: number) => T)): T[] {
    if (element instanceof Function) {
        return [...Array(count)].map((_, index) => element(index));
    }
    return Array(count).fill(element);
}

export function extractMap<T extends Record<string, unknown>, K extends keyof T>(array: readonly T[], ...keys: K[]): Pick<T, K>[] {
    return array.map(value => keys.reduce((prev, current) => ({ ...prev, [current]: value[current] }), {} as Pick<T, K>));
}