import {greaterThan} from '../../src/greater/than';

describe('greaterThan', () => {
	it(`should return false when both left are 0`, () => {
		expect(greaterThan(0, 0)).toBe(false);
	});

	it(`should return false when both left are 1`, () => {
		expect(greaterThan(1, 1)).toBe(false);
	});

	it(`should return false when comparing the same negative number`, () => {
		expect(greaterThan(-10, -10)).toBe(false);
	});

	it(`should return false when comparing 0 and 1`, () => {
		expect(greaterThan(0, 1)).toBe(false);
	});

	it(`should return true when comparing 1 and 0`, () => {
		expect(greaterThan(1, 0)).toBe(true);
	});

	it(`should return false when left arg is a string`, () => {
		expect(greaterThan('aaa' as any, 0)).toBe(false);
	});

	it(`should return false when right arg is a string`, () => {
		expect(greaterThan(1, '0' as any)).toBe(false);
	});

	it(`should return false when both args are strings`, () => {
		expect(greaterThan('aaa', 'bbb')).toBe(false);
	});

	it(`should return false when left < right (positive ints)`, () => {
		expect(greaterThan(10, 100)).toBe(false);
	});

	it(`should return false when left < right (negative ints)`, () => {
		expect(greaterThan(-100, -10)).toBe(false);
	});
});
