import {isNumberFinite} from '../is/number/finite';

export function lessThan(left: number | unknown, right: number | unknown): boolean {
	if (!isNumberFinite(left) || !isNumberFinite(right)) {
		return false;
	}

	return left < right;
}
