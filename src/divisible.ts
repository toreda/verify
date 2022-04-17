import {isNumberFinite} from './is/number/finite';

/**
 * Determine if 'value' can be evenly divided into provided number.
 * @param value		Number to be divided.
 * @param by		Number to divide value by.
 * @returns
 */
export function divisible(value: unknown, by: unknown): value is number {
	if (!isNumberFinite(value) || !isNumberFinite(by)) {
		return false;
	}

	return value % by === 0;
}
