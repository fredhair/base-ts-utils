export type NumberOrdinal = 'st' | 'nd' | 'rd' | 'th';

export interface INumericRange {
  lowerBound: number;
  upperBound: number;
}

export class NumericRange implements INumericRange {
  constructor(public lowerBound: number, public upperBound: number) {}
}

/**
 * Returns the ordinal of any positive number
 *
 * @param value The number whose ordinal you wish to get
 * @returns A NumberOrdinal type value i.e. either 'st', 'nd', 'rd' or 'th'
 */
export function getNumberOrdinal(value: number): NumberOrdinal {
  if (isNumberBetween(value % 100, 10, 20, true)) {
    return 'th';
  }
  switch (value % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

/**
 * Checks if a number is within a {@linkcode INumericRange}
 *
 * @param value The value to check
 * @param range The NumericRange to compare with
 * @param inclusive Whether the range is inclusive i.e. 2,3,4,5 is in the inclusive range 2-5 \
 * whereas only 3 and 4 are in the same non-inclusive range. False by default
 * @returns True if in range, false otherwise
 */
export function isNumberInRange(
  value: number,
  range: INumericRange,
  inclusive = false
): boolean {
  return isNumberBetween(value, range.lowerBound, range.upperBound, inclusive);
}

/**
 * Checks if a number is between a lower and upper bound similar to {@linkcode isNumberInRange}
 *
 * @param value The value to check
 * @param lowerBound The lower bound of the range
 * @param upperBound The upper bound of the range
 * @param inclusive Whether the range is inclusive i.e. 2,3,4,5 is in the inclusive range 2-5 \
 * whereas only 3 and 4 are in the same non-inclusive range. False by default
 * @returns True if in range, false otherwise
 */
export function isNumberBetween(
  value: number,
  lowerBound: number,
  upperBound: number,
  inclusive = false
): boolean {
  if (inclusive) {
    return value >= lowerBound && value <= upperBound;
  } else {
    return value > lowerBound && value < upperBound;
  }
}
