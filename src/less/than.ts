import {isNumberFinite} from '../is/number/finite';

export function lessThan(value: unknown, right: unknown): boolean {
	if (!isNumberFinite(value) || !isNumberFinite(right)) {
		return false;
	}

	return value < right;
}
