import {Fate} from '@toreda/fate';

/**
 *
 * @param value
 * @returns
 *
 * @category Url
 */
export function chkUrl(value?: string | null): Fate<never> {
	const fate = new Fate<never>();

	if (value === undefined || value === null) {
		return fate.setErrorCode('missing');
	}

	return fate.setSuccess(true);
}
