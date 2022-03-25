import type {ChkFlags} from '../flags';
import {Fate} from '@toreda/fate';

/**
 * Check if value is a valid id string according to the optional validation rules when provided.
 * Uses default rules when not provided.
 * @param id
 * @param value
 * @param rules
 * @returns
 *
 * @category Chk
 */
export function chkStringId<T>(id: string, value: string, flags?: ChkFlags): Fate<T> {
	const fate = new Fate<T>();

	if (typeof id !== 'string') {
		return fate.setErrorCode('no_id');
	}

	if (value === undefined) {
		return fate.setErrorCode(`${id}:missing`);
	}

	if (typeof value !== 'string') {
		return fate.setErrorCode(`${id}:bad_format`);
	}

	const trimmed = flags?.notrim !== true ? value.trim() : value;

	if (!trimmed) {
		if (flags?.allow && flags.allow.empty !== true) {
			return fate.setErrorCode(`${id}:empty`);
		}
	}

	if (flags?.length) {
		if (typeof flags.length.max === 'number' && trimmed.length > flags.length.max) {
			return fate.setErrorCode(`${id}:too_long`);
		}

		if (typeof flags.length.min === 'number' && trimmed.length < flags.length.min) {
			return fate.setErrorCode(`${id}:too_short`);
		}
	}

	return fate;
}
