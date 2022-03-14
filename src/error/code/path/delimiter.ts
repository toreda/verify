import Defaults from '../../../defaults';

/**
 * Accepts and validates an optional string value to use as the
 * error code path delimiter. Returns provided value if it's
 * a valid string. Returns global default delimiter when value is not
 * provided, or not a valid string.
 * @param value
 * @returns
 *
 * @category Errors
 */
export function errorCodePathDelimiter(value?: string): string {
	if (typeof value !== 'string') {
		return Defaults.ErrorCode.PathDelimiter;
	}

	if (value === '') {
		return Defaults.ErrorCode.PathDelimiter;
	}

	return value;
}
