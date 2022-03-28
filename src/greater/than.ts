import {isNumberFinite} from '../is/number/finite';

/**
 * Determines if left and right are both finite numbers to check
 * whether left > right. Returns false when left or right is not
 * a finite number.
 * @param left
 * @param right
 * @returns
 *
 * @category Comparators
 */
export function greaterThan(left: number, right: number): boolean {
	if (!isNumberFinite(left) || !isNumberFinite(right)) {
		return false;
	}

	return left > right;
}
