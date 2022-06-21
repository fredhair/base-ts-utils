// type RequiresObjectType = 'The typeof this must be a javascript object';
// type IsObject<T> = T extends Record<string, unknown> ? T : RequiresObjectType;

export interface IUtilityArray<T> extends Array<T> {
  /**
   * Provides a getter (& setter for mutable) for the last element. \
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
   * Finds a single matching array item and removes it
   *
   * @param needleObject The data to match against
   * @returns The removed object or undefined if not found
   */
  removeWhere<U extends Record<string, unknown>>(
    this: IUtilityArray<U>,
    needleObject: Partial<U>
  ): U | undefined;

  /**
   * Extracts new objects containing only the keys specified
   *
   * @param keys Keys of the object that should be extracted
   */
  extractMap<U extends Record<string, unknown>, K extends keyof U>(
    this: IUtilityArray<U>,
    ...keys: K[]
  ): Pick<U, K>[];

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
  findBy<U extends Record<string, unknown>, K extends keyof U>(
    this: IUtilityArray<U>,
    key: K,
    value: typeof this[number][typeof key]
  ): U | undefined;

  /**
   * Like {@linkcode findBy} this checks an array of objects based on the value of a single key. \
   * This function returns the index rather than the object itself
   *
   * @param key The key to check
   * @param value The value to check against
   * @returns The found object index in the array or -1 if not found
   */
  findIndexBy<U extends Record<string, unknown>, K extends keyof U>(
    this: IUtilityArray<U>,
    key: K,
    value: typeof this[number][typeof key]
  ): number;

  /**
   * Finds an array item based on any number of matching object keys.
   *
   * @param needleObject The data to match against
   * @returns The found object or undefined if not found
   */
  findWhere<U extends Record<string, unknown>>(
    this: IUtilityArray<U>,
    needleObject: Partial<U>
  ): U | undefined;

  /**
   * Finds an array item's inded based on any number of matching object keys.
   *
   * @param needleObject The data to match against
   * @returns The found index or -1
   */
  findIndexWhere<U extends Record<string, unknown>>(
    this: IUtilityArray<U>,
    needleObject: Partial<U>
  ): number;

}

export class MutableArray<T> extends Array<T> implements IUtilityArray<T> {
  /**
   * Used to construct and fill an array with a convenient generator callback syntax
   *
   * @param count The number of elements to create
   * @param element A static object to be copied or a generator function that takes in the index and returns an object
   */
  static populate<U>(
    count: number,
    element: U | ((index: number) => U)
  ): MutableArray<U> {
    if (element instanceof Function) {
      return new MutableArray<U>(
        ...[...Array(count)].map((_, index) => element(index))
      );
    }
    return new MutableArray<U>(count).fill(element);
  }

  get last(): T | undefined {
    return this.length ? this[this.length - 1] : undefined;
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

  removeWhere<U extends Record<string, unknown>>(this: IUtilityArray<U>, needleObject: Partial<U>): U | undefined {
    return this.removeAt(this.findIndexWhere(needleObject));
  }

  extractMap<U extends Record<string, unknown>, K extends keyof U>(
    this: IUtilityArray<U>,
    ...keys: K[]
  ): Pick<U, K>[] {
    return this.map((value) =>
      keys.reduce(
        (prev, current) => ({ ...prev, [current]: value[current] }),
        {} as Pick<U, K>
      )
    );
  }

  findBy<U extends Record<string, unknown>, K extends keyof U>(
    this: IUtilityArray<U>,
    key: K,
    value: typeof this[number][typeof key]
  ): U | undefined {
    return this.find(({ [key]: needle }) => needle === value);
  }

  findIndexBy<U extends Record<string, unknown>, K extends keyof U>(
    this: IUtilityArray<U>,
    key: K,
    value: U[K]
  ): number {
    return this.findIndex(({ [key]: needle }) => needle === value);
  }

  findWhere<U extends Record<string, unknown>>(this: IUtilityArray<U>, needleObject: Partial<U>): U | undefined {
    return this.find(iterator => {
      for (const [needleKey, needleValue] of Object.entries(needleObject)) {
        if (iterator[needleKey] === needleValue) {
          return false;
        }
      }
      return true;
    });
  }

  findIndexWhere<U extends Record<string, unknown>>(this: IUtilityArray<U>, needleObject: Partial<U>): number {
    return this.findIndex(iterator => {
      for (const [needleKey, needleValue] of Object.entries(needleObject)) {
        if (iterator[needleKey] === needleValue) {
          return false;
        }
      }
      return true;
    });
  }
}


export class ImmutableArray<T> extends Array<T> implements IUtilityArray<T> {
  /**
   * Used to construct and fill an array with a convenient generator callback syntax
   *
   * @param count The number of elements to create
   * @param element A static object to be copied or a generator function that takes in the index and returns an object
   */
  static populate<U>(
    count: number,
    element: U | ((index: number) => U)
  ): ImmutableArray<U> {
    if (element instanceof Function) {
      return new ImmutableArray<U>(
        ...[...Array(count)].map((_, index) => element(index))
      );
    }
    return new ImmutableArray<U>(count).fill(element);
  }

  get last(): T | undefined {
    return this.length ? this[this.length - 1] : undefined;
  }

  replaceAt(index: number, value: T): T | undefined {
    return this.splice(index, 1, value)?.[0];
  }

  removeAt(index: number): T | undefined {
    return this.splice(index, 1)?.[0];
  }

  removeWhere<U extends Record<string, unknown>>(this: IUtilityArray<U>, needleObject: Partial<U>): U | undefined {
    return this.removeAt(this.findIndexWhere(needleObject));
  }

  extractMap<U extends Record<string, unknown>, K extends keyof U>(
    this: IUtilityArray<U>,
    ...keys: K[]
  ): Pick<U, K>[] {
    return this.map((value) =>
      keys.reduce(
        (prev, current) => ({ ...prev, [current]: value[current] }),
        {} as Pick<U, K>
      )
    );
  }

  findBy<U extends Record<string, unknown>, K extends keyof U>(
    this: IUtilityArray<U>,
    key: K,
    value: typeof this[number][typeof key]
  ): U | undefined {
    return this.find(({ [key]: needle }) => needle === value);
  }

  findIndexBy<U extends Record<string, unknown>, K extends keyof U>(
    this: IUtilityArray<U>,
    key: K,
    value: U[K]
  ): number {
    return this.findIndex(({ [key]: needle }) => needle === value);
  }

  findWhere<U extends Record<string, unknown>>(this: IUtilityArray<U>, needleObject: Partial<U>): U | undefined {
    return this.find(iterator => {
      for (const [needleKey, needleValue] of Object.entries(needleObject)) {
        if (iterator[needleKey] === needleValue) {
          return false;
        }
      }
      return true;
    });
  }

  findIndexWhere<U extends Record<string, unknown>>(this: IUtilityArray<U>, needleObject: Partial<U>): number {
    return this.findIndex(iterator => {
      for (const [needleKey, needleValue] of Object.entries(needleObject)) {
        if (iterator[needleKey] === needleValue) {
          return false;
        }
      }
      return true;
    });
  }
}

export function populatedArray<T = unknown>(
  count: number,
  element: T | ((index: number) => T)
): T[] {
  if (element instanceof Function) {
    return [...Array(count)].map((_, index) => element(index));
  }
  return Array(count).fill(element);
}

export function extractMap<
  T extends Record<string, unknown>,
  K extends keyof T
>(array: readonly T[], ...keys: K[]): Pick<T, K>[] {
  return array.map((value) =>
    keys.reduce(
      (prev, current) => ({ ...prev, [current]: value[current] }),
      {} as Pick<T, K>
    )
  );
}
