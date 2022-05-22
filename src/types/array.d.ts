export interface IReadonlyUtilityArray<T> extends ReadonlyArray<T> {
    last: T | undefined;

    extractMap<K extends keyof T>(...keys: K[]): Pick<T, K>[];
}

// type RequiresObjectType = 'The typeof this must be a javascript object';
// type IsObject<T> = T extends Record<string, unknown> ? T : RequiresObjectType;

export interface IUtilityArray<T> extends Array<T> {
    /**
     * Provides a getter & setter for the last element. \
     * The last element can only be set with a non undefined value
     */
    last: T | undefined;

    /**
     * Replaces a single element in a mutable array
     * 
     * @param index The index to be replaced
     * @param value The new value to be inserted
     * @returns The replaced value
     */
    replaceAt(index: number, value: T): T | undefined;

    /**
     * Removes a single element in a mutable array
     * 
     * @param index The index to be removed
     * @returns The removed value
     */
    removeAt(index: number): T | undefined;

    /**
     * Extracts new objects containing only the keys specified
     * 
     * @param keys Keys of the object that should be extracted
     */
    extractMap<U extends Record<string, unknown>, K extends keyof U>(this: IUtilityArray<U>, ...keys: K[]): Pick<U, K>[];

    /**
     * Finds an object based on the value of a key \
     * i.e. this could be used to find an object with a matching ID 
     * 
     * ```
     * findBy('id', idToCheck)
     * ```
     * 
     * This simplifies currying functions that find objects based on a single key value:
     * 
     * ```
     * findUserById = (id: number) => this.users.findBy('id', id)
     * findUserById(1234)
     * ```
     * 
     * @param key The key to check
     * @param value The value to check against
     * @returns The found object or undefined if not found
     */
    findBy<U extends Record<string, unknown>, K extends keyof U>(this: IUtilityArray<U>, key: K, value: typeof this[number][typeof key]): U | undefined;

    /**
     * Like {@linkcode findBy} this checks an array of objects based on the value of a single key. \
     * This function returns the index rather than the object itself
     * 
     * @param key The key to check
     * @param value The value to check against
     * @returns The found object index in the array or -1 if not found
     */
    findIndexBy<U extends Record<string, unknown>, K extends keyof U>(this: IUtilityArray<U>, key: K, value: typeof this[number][typeof key]): number;
}

/**
 * Used to construct and fill an array with a convenient generator callback syntax
 * 
 * @param count The number of elements to create
 * @param element A static object to be copied or a generator function that takes in the index and returns an object
 */
export function populatedArray<T = unknown>(count: number, element: T | ((index: number) => T)): T[];

/**
 * Creates an array of new objects containing only the keys specified
 * 
 * @param array The array to extract objects from
 * @param keys Keys of the object that should be extracted
 */
export function extractMap<T extends Record<string, unknown>, K extends keyof T>(array: readonly T[], ...keys: K[]): Pick<T, K>[];