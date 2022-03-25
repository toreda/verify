import {Fate} from '@toreda/fate';

/**
 * Determine if target value is a valid boolean.
 * @param value
 * @returns
 *
 * @category Validation
 */
export function chkBoolean(value?: null): Fate<never> {
	const fate = new Fate<never>();

	if (value === null || value === undefined) {
		return fate.setErrorCode('missing');
	}

	if (value !== true && value !== false) {
		return fate.setErrorCode('bad_value_type');
	}

	return fate.setSuccess(true);
}
