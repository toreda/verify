import {isNumberFinite} from '../is/number/finite';

export function lessThan<ValueT>(value: ValueT, right: number): boolean {
	if (!isNumberFinite(value) || !isNumberFinite(right)) {
		return false;
	}

	return value < right;
}
