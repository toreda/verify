/**
 *
 * @param value
 * @returns
 *
 * @cattegory Validator
 */
export async function empty<ValueT>(value?: ValueT | null): Promise<boolean> {
	if (Array.isArray(value)) {
		return value.length === 0;
	}

	if (typeof value === 'string') {
		return value.trim().length === 0;
	}

	return false;
}
