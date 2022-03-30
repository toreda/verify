import {isInt} from '../int';

/**
 * Determine if value arg is a positive integer, but does not provide any additional
 * guarantees about value other than it is, or is not a positive integer.
 * @param value		Target value to be tested.
 * @returns			true	-	value is a positive integer.
 *					false	-	value is not a positive integer, but does not indicate what value is.
 *
 * @category Validator Functions
 */
export function isIntPos(value?: unknown): value is number {
	if (!isInt(value)) {
		return false;
	}

	return value >= 0;
}
