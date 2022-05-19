declare global {
    interface ReadonlyArray<T> {
        /**
         * Returns the last element of the array. \
         * \
         * If the array is empty; undefined is returned
         * 
         * @returns The last value of the array
         */
        get last(): T | undefined;
    }

    interface Array<T> {
        /**
         * Returns the last element of the array. \
         * \
         * If the array is empty; undefined is returned
         * 
         * @returns The last value of the array 
         */
        get last(): T | undefined;

        /**
         * Sets the last element of an array
         * 
         * @param {T} value The new value to be set
         */
        set last(value: T | undefined);

        /**
         * Replaces a single element in a mutable array
         * 
         * @param index The index to be replaced
         * @param value The new value to be inserted
         * @returns The replaced value
         */
        replaceAt(index: number, value: T): T;

        /**
         * Removes a single element in a mutable array
         * 
         * @param index The index to be removed
         * @returns The removed value
         */
        removeAt(index: number): T;
    }
}

export { };