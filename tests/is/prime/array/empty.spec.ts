import {isArrayEmpty} from '../../../../src/is/array/empty';

const EMPTY_ARRAY: unknown[] = [];
const EMPTY_OBJECT = {};
const EMPTY_STRING = '';
const STR = 'aa-197141-917491714';

describe('isArrayEmpty', () => {
	it(`should return true when arg is an empty array`, () => {
		expect(isArrayEmpty(EMPTY_ARRAY)).toBe(true);
	});

	it(`should return false when arg is an array with 1 element`, () => {
		expect(isArrayEmpty(['aa'])).toBe(false);
	});

	it(`should return false when arg is an empty object`, () => {
		expect(isArrayEmpty(['aa'])).toBe(false);
	});

	it(`should return false when arg is an empty object`, () => {
		expect(isArrayEmpty(EMPTY_OBJECT as any)).toBe(false);
	});

	it(`should return false when arg is a string`, () => {
		expect(isArrayEmpty(STR as any)).toBe(false);
	});
});
