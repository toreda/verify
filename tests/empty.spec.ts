import {empty} from '../src/empty';
const EMPTY_ARRAY: string[] = [];

describe('empty', () => {
	it(`should return false when value is undefined`, () => {
		expect(empty<any>(undefined)).toBe(false);
	});

	it(`should return false when value is null`, () => {
		expect(empty<any>(null)).toBe(false);
	});

	it(`should return false when value is a non-empty array`, () => {
		expect(empty<any>([11, 'aa'])).toBe(false);
	});

	it(`should return true when value is an empty array`, () => {
		expect(empty<any>(EMPTY_ARRAY)).toBe(true);
	});

	it(`should return true when value is an empty object`, () => {
		expect(empty<any>({})).toBe(true);
	});

	it(`should return false when value is a non-empty string`, () => {
		expect(empty<any>('aaaaaa')).toBe(false);
	});

	it(`should return false when value is a non-empty string`, () => {
		expect(empty<any>('aaaaaa')).toBe(false);
	});

	it(`should return true when value is a space-padded empty string`, () => {
		let value = ' ';

		for (let i = 0; i < 5; i++) {
			expect(empty<any>(value)).toBe(true);
			value += ' ';
		}
	});

	it(`should return true when value is an non-empty object`, () => {
		expect(
			empty<any>({
				one: 'aaaaa'
			})
		).toBe(false);
	});

	it(`should return false when value is a boolean (true)`, () => {
		expect(empty<boolean>(true)).toBe(false);
	});

	it(`should return false when value is a boolean (true)`, () => {
		expect(empty<boolean>(false)).toBe(false);
	});

	it(`should return false when value is a falsy number (0)`, () => {
		expect(empty<number>(0)).toBe(false);
	});

	it(`should return false when value is a truthy number`, () => {
		expect(empty<number>(1)).toBe(false);
		expect(empty<number>(10000)).toBe(false);
		expect(empty<number>(-1)).toBe(false);
	});
});
