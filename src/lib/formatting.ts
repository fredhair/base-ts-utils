import { INumericRange, NumberOrdinal } from "../types/formatting";

export class NumericRange implements INumericRange {
    constructor(public lowerBound: number, public upperBound: number) { };
}

export function getNumberOrdinal(value: number): NumberOrdinal {
    if (isNumberBetween(value % 100, 10, 20, true)) {
        return 'th';
    }
    switch (value % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

export function isNumberInRange(value: number, range: INumericRange, inclusive = false): boolean {
    return isNumberBetween(value, range.lowerBound, range.upperBound, inclusive);
}

export function isNumberBetween(value: number, lowerBound: number, upperBound: number, inclusive = false): boolean {
    if (inclusive) {
        return value >= lowerBound && value <= upperBound;
    } else {
        return value > lowerBound && value < upperBound;
    }
}

