import Defaults from '../../src/defaults';
import {ErrorCode} from '../../src/error/code';
import {ErrorCodeData} from '../../src/error/code/data';

const ENTITY = 'system';
const PATH_ARR = ['one', 'two', 'three'];
const PATH_STR = 'pathcomponent';
const CODE = 'bad_example';
const EMPTY_ARRAY: string[] = [];

describe('ErrorCode', () => {
	let instance: ErrorCode<string, string, string>;
	beforeAll(() => {
		instance = new ErrorCode<string, string, string>(ENTITY, PATH_ARR, CODE);
	});

	describe('Constructor', () => {
		it(`should use the global default entity when no entity arg is provided`, () => {
			const custom = new ErrorCode<string, string, string>(undefined as any, PATH_STR, CODE);

			expect(custom.entity).toBe(Defaults.ErrorCode.Entity);
		});

		it(`should initialize customCodeToken to undefined when args is not provided`, () => {
			const custom = new ErrorCode<string, string, string>(ENTITY, PATH_ARR, CODE);

			expect(custom.customCodeToken).toBeUndefined();
		});

		it(`should initialize customPathDelim to undefined when args is not provided`, () => {
			const custom = new ErrorCode<string, string, string>(ENTITY, PATH_ARR, CODE);

			expect(custom.customPathDelim).toBeUndefined();
		});

		it(`should initialize customPathDelim to undefined when args.customPathDelim is not set`, () => {
			const custom = new ErrorCode<string, string, string>(ENTITY, PATH_ARR, CODE, {
				codeToken: '|'
			});

			expect(custom.customPathDelim).toBeUndefined();
		});

		it(`should initialize customCodeToken to undefined when args.customCodeToken is not set`, () => {
			const custom = new ErrorCode<string, string, string>(ENTITY, PATH_ARR, CODE, {
				pathDelimiter: '::'
			});

			expect(custom.customCodeToken).toBeUndefined();
		});
	});

	describe('Implementation', () => {
		describe('mkPath', () => {
			it(`should return an empty array when value arg is undefined`, () => {
				expect(instance.mkPath()).toStrictEqual(EMPTY_ARRAY);
			});

			it(`should return an empty array when value arg is null`, () => {
				expect(instance.mkPath()).toStrictEqual(EMPTY_ARRAY);
			});

			it(`should return value wrapped in an array when value arg is a string`, () => {
				const value = '1491491714971';
				const result = instance.mkPath(value);

				expect(Array.isArray(result)).toBe(true);
				expect(result.length).toBe(1);
				expect(result[0]).toBe(value);
			});

			it(`should return value when value arg is an array`, () => {
				const value: string[] = ['a', 'b', 'c'];

				expect(instance.mkPath(value)).toStrictEqual(value);
			});
		});

		describe('toData', () => {
			let dataEntity: string;
			let dataPath: string[];
			let dataCode: string;
			let dataErrorCode: ErrorCode<string, string, string>;
			let dataResult: ErrorCodeData;

			beforeAll(() => {
				dataCode = 'datacode9971451';
				dataEntity = 'entity1490714';
				dataPath = ['a761', 'b47', '66va12'];
				dataErrorCode = new ErrorCode<string, string, string>(dataEntity, dataPath, dataCode);
				dataResult = dataErrorCode.toData();
			});

			it(`should return data object with entity set to ErrorCode.entity`, () => {
				expect(dataResult).toHaveProperty('entity');
				expect(dataResult.entity).toBe(dataEntity);
			});

			it(`should return data object with path set to ErrorCode.path`, () => {
				expect(dataResult).toHaveProperty('path');
				expect(dataResult.path).toBe(dataPath);
			});

			it(`should return data object with code set to ErrorCode.code`, () => {
				expect(dataResult).toHaveProperty('code');
				expect(dataResult.code).toBe(dataCode);
			});

			it(`should not define customCodeToken property when ErrorCode.customCodeToken is undefined `, () => {
				expect(dataResult.customCodeToken).toBeUndefined();
			});

			it(`should not define customPathDelimiter property when ErrorCode.customPathDelimiter is undefined `, () => {
				expect(dataResult.customPathDelim).toBeUndefined();
			});
		});

		describe('toString', () => {});
	});
});
