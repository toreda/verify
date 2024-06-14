import {isSchemaDataObject} from '../../../../src/is/schema/data/object';

const EMPTY_OBJECT = {};
const EMPTY_STRING = '';
const EMPTY_ARRAY: any[] = [];

describe('isSchemaDataObject', () => {
	it(`should return true when value is an empty object`, () => {
		expect(isSchemaDataObject(EMPTY_OBJECT)).toBe(true);
	});

	it(`should return false when value is an empty array`, () => {
		expect(isSchemaDataObject(EMPTY_ARRAY)).toBe(false);
	});

	it(`should return false when value is an empty string`, () => {
		expect(isSchemaDataObject(EMPTY_STRING)).toBe(false);
	});

	it(`should return false when value is undefined`, () => {
		expect(isSchemaDataObject(undefined)).toBe(false);
	});

	it(`should return false when value is null`, () => {
		expect(isSchemaDataObject(null)).toBe(false);
	});
});
