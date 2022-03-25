export function isNumber(value: unknown): boolean {
	if (typeof value !== 'number') {
		return false;
	}

	if (Number.isNaN(value)) {
		return false;
	}

	return Number.isFinite(value);
}
