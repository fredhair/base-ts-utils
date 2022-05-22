export type NumberOrdinal = 'st' | 'nd' | 'rd' | 'th';

export function getNumberOrdinal(value: number): NumberOrdinal;

export interface INumericRange {
    lowerBound: number;
    upperBound: number;
}

declare class NumericRange implements INumericRange {
    lowerBound: number;
    upperBound: number;
}