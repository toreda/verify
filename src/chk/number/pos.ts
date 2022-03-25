import {Fate} from '@toreda/fate';

/**
 *
 * @param value
 *
 * @category Validation
 */
export function chkNumberPos(value?: unknown | null): Fate<never> {
	const fate = new Fate<never>();

	if (value === undefined || value === null) {
		return fate.setErrorCode('missing');
	}

	if (typeof value !== 'number') {
		return fate.setErrorCode(`bad_format`);
	}

	if (isNaN(value)) {
		return fate.setErrorCode('non_finite_value');
	}

	return fate;
}
