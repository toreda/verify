import {isNumberFinite} from './number/finite';

/**
 *
 * @param value
 * @returns
 *
 * @category Validator Functions
 */
export function isInt(value?: unknown): value is number {
	if (!isNumberFinite(value)) {
		return false;
	}

	return Math.floor(value) === value;
}
