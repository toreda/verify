import {lessThan} from '../../src/less/than';

describe('lessThan', () => {
	it(`should return false when left and right are 0`, () => {
		expect(lessThan(0, 0)).toBe(false);
	});

	it(`should return false when left and right are 1`, () => {
		expect(lessThan(1, 1)).toBe(false);
	});

	it(`should return false when comparing the same negative number`, () => {
		expect(lessThan(-10, -10)).toBe(false);
	});

	it(`should return true when comparing 0 < 1`, () => {
		expect(lessThan(0, 1)).toBe(true);
	});

	it(`should return false when comparing 1 < 0`, () => {
		expect(lessThan(1, 0)).toBe(false);
	});

	it(`should return false when left arg is a string`, () => {
		expect(lessThan('aaa' as any, 0)).toBe(false);
	});

	it(`should return false when right arg is a string`, () => {
		expect(lessThan(1, '0' as any)).toBe(false);
	});

	it(`should return false when both args are strings`, () => {
		expect(lessThan('aaa', 'bbb')).toBe(false);
	});

	it(`should return true when left < right (positive ints)`, () => {
		expect(lessThan(10, 100)).toBe(true);
	});

	it(`should return true when left < right (negative ints)`, () => {
		expect(lessThan(-100, -10)).toBe(true);
	});
});
