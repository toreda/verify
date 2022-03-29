import {between} from '../src/between';

describe('between', () => {
	describe('Missing Arguments', () => {
		it(`should return false when left value is undefined`, async () => {
			const result = await between<number>(undefined as any, 0, 10);

			expect(result).toBe(false);
		});

		it(`should return false when left value is null`, async () => {
			const result = await between<number>(null as any, 0, 10);

			expect(result).toBe(false);
		});

		it(`should return false when right value is undefined`, async () => {
			const result = await between<number>(0, 10, undefined as any);

			expect(result).toBe(false);
		});

		it(`should return false when right value is null`, async () => {
			const result = await between<number>(0, 10, null as any);

			expect(result).toBe(false);
		});
	});

	describe('Non-Finite Numbers', () => {
		it(`should return false when left arg is Positive Infinity`, async () => {
			const result = await between<number>(Number.POSITIVE_INFINITY, 10, 100);

			expect(result).toBe(false);
		});

		it(`should return false when left arg is Negative Infinity`, async () => {
			const result = await between<number>(Number.NEGATIVE_INFINITY, 10, 100);

			expect(result).toBe(false);
		});

		it(`should return false when value arg is Positive Infinity`, async () => {
			const result = await between<number>(1, Number.POSITIVE_INFINITY, 100);

			expect(result).toBe(false);
		});

		it(`should return false when value arg is Negative Infinity`, async () => {
			const result = await between<number>(1, Number.NEGATIVE_INFINITY, 100);

			expect(result).toBe(false);
		});

		it(`should return false when right arg is Positive Infinity`, async () => {
			const result = await between<number>(1, 10, Number.POSITIVE_INFINITY);

			expect(result).toBe(false);
		});

		it(`should return false when right arg is Negative Infinity`, async () => {
			const result = await between<number>(1, 10, Number.NEGATIVE_INFINITY);

			expect(result).toBe(false);
		});
	});

	describe('Integer Values', () => {
		it(`should return false when all args are 0`, async () => {
			const result = await between<number>(0, 0, 0);

			expect(result).toBe(false);
		});

		it(`should return false when all args are the same integer value`, async () => {
			const result = await between<number>(111, 111, 111);

			expect(result).toBe(false);
		});

		it(`should return true when integer value is between integer args`, async () => {
			const result = await between<number>(0, 10, 20);

			expect(result).toBe(false);
		});

		it(`should return true when left arg is negative`, async () => {
			const result = await between<number>(-10, 0, 10);

			expect(result).toBe(true);
		});

		it(`should return true when left and right args are negative`, async () => {
			const result = await between<number>(-20, -10, -5);

			expect(result).toBe(true);
		});
	});
});
