import {isNumberFinite} from '../is/number/finite';

export function lessThan(left: unknown, right: unknown): boolean {
	if (!isNumberFinite(left) || !isNumberFinite(right)) {
		return false;
	}

	return left < right;
}
