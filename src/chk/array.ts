import type {ChkFlags} from './flags';
import {Fate} from '@toreda/fate';

/**
 *
 * @param value
 * @param flags
 * @returns
 *
 * @category Validation
 */
export function chkArray(value?: unknown[] | null, flags?: ChkFlags): Fate<never> {
	const fate = new Fate<never>();

	if (value === undefined || value === null) {
		return fate.setErrorCode('missing');
	}

	if (!Array.isArray(value)) {
		return fate.setErrorCode('bad_format');
	}

	const empty = value.length === 0;

	// Empty arrays are valid by default unless flags.allow.empty is explicitly true.
	if (empty && flags?.allow?.empty === false) {
		return fate.setErrorCode('empty');
	}

	return fate.setSuccess(true);
}
