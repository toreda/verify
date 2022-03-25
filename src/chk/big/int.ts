import {Fate} from '@toreda/fate';

/**
 * Deteremine if provided value is a valid BigInt.
 * @param value
 *
 * @category Validation
 */
export function chkBigInt(value?: null): Fate<never> {
	const fate = new Fate<never>();

	if (value === undefined || value === null) {
		return fate.setErrorCode('missing');
	}

	if (typeof value !== 'bigint') {
		return fate.setErrorCode('bad_value_type');
	}

	return fate.setSuccess(true);
}
