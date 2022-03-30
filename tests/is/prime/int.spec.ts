import {isPrimeInt} from '../../../src/is/prime/int';

const PRIMES: number[] = [
	2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 739, 7393, 73939, 739391
];

const NON_PRIMES: number[] = [
	1, 4, 6, 12, 14, 16, 18, 20, 21, 24, 25, 26, 27, 28, 30, 32, 33, 34, 35, 36, 2.1, 5.5, 19.9999, 73938,
	739390
];

describe('isPrimeInt', () => {
	it(`should return false for 0`, async () => {
		expect(isPrimeInt(0)).toBe(false);
	});

	it(`should return false for 1`, async () => {
		expect(isPrimeInt(1)).toBe(false);
	});

	it(`should return false for -1`, async () => {
		expect(isPrimeInt(-1)).toBe(false);
	});

	it(`should return false for negative infinity`, async () => {
		expect(isPrimeInt(Number.NEGATIVE_INFINITY)).toBe(false);
	});

	it(`should return false for positive infinity`, async () => {
		expect(isPrimeInt(Number.POSITIVE_INFINITY)).toBe(false);
	});

	it(`should return false for NaN`, async () => {
		expect(isPrimeInt(Number.NaN)).toBe(false);
	});

	for (const prime of PRIMES) {
		it(`should return true for sample prime '${prime}'`, async () => {
			expect(isPrimeInt(prime)).toBe(true);
		});
	}

	for (const nonPrime of NON_PRIMES) {
		it(`should return false for sample non-prime '${nonPrime}'`, async () => {
			expect(isPrimeInt(nonPrime)).toBe(false);
		});
	}
});
