import Defaults from '../../src/defaults';
import {ErrorCode} from '../../src/error/code';
import {ErrorCodeData} from '../../src/error/code/data';

const ROOT = 'system';
const PATH_ARR = ['one', 'two', 'three'];
const PATH_STR = 'pathcomponent';
const CODE = 'bad_example';
const EMPTY_ARRAY: string[] = [];

describe('ErrorCode', () => {
	let instance: ErrorCode<string, string, string>;
	beforeAll(() => {
		instance = new ErrorCode<string, string, string>(CODE, ROOT, ...PATH_ARR);
	});

	describe('Constructor', () => {
		it(`should use the global default value when root arg is undefined`, () => {
			const custom = new ErrorCode<string, string, string>(CODE, undefined as any, PATH_STR);

			expect(custom.context.root).toBe(Defaults.ErrorCode.Root);
		});

		it(`should initialize customCodeToken to undefined when args is not provided`, () => {
			const custom = new ErrorCode<string, string, string>(CODE, ROOT, ...PATH_ARR);

			expect(custom.customCodeToken).toBeUndefined();
		});

		it(`should initialize customPathDelim to undefined when args is not provided`, () => {
			const custom = new ErrorCode<string, string, string>(CODE, ROOT, ...PATH_ARR);

			expect(custom.customPathDelim).toBeUndefined();
		});

		it(`should initialize customCodeToken to undefined when args.customCodeToken is not set`, () => {
			const custom = new ErrorCode<string, string, string>(CODE, ROOT, ...PATH_ARR);

			expect(custom.customCodeToken).toBeUndefined();
		});
	});

	describe('Implementation', () => {
		describe('toData', () => {
			let dataRoot: string;
			let dataPath: string[];
			let dataCode: string;
			let dataErrorCode: ErrorCode<string, string, string>;
			let dataResult: ErrorCodeData;

			beforeAll(() => {
				dataCode = 'datacode9971451';
				dataRoot = 'root__1490714';
				dataPath = ['a761', 'b47', '66va12'];
				dataErrorCode = new ErrorCode<string, string, string>(dataCode, dataRoot, ...dataPath);
				dataResult = dataErrorCode.toData();
			});

			it(`should return data object with context property`, () => {
				expect(dataResult).toHaveProperty('context');
			});

			it(`should return data object with root property`, () => {
				expect(dataResult).toHaveProperty('context');
				expect(dataResult.context).toHaveProperty('root');
				expect(dataResult.context.root).toBe(dataRoot);
			});

			it(`should return data object with path array`, () => {
				expect(dataResult.context).toHaveProperty('path');
				expect(dataResult.context.path).toEqual(dataPath);
				expect(Array.isArray(dataResult.context.path)).toBe(true);
			});

			it(`should return data object with code set to ErrorCode.code`, () => {
				expect(dataResult).toHaveProperty('code');
				expect(dataResult.code).toBe(dataCode);
			});

			it(`should not define customCodeToken property when ErrorCode.customCodeToken is undefined `, () => {
				expect(dataResult.cfg.customCodeToken).toBeUndefined();
			});

			it(`should not define customPathDelimiter property when ErrorCode.customPathDelimiter is undefined `, () => {
				expect(dataResult.cfg.customPathDelim).toBeUndefined();
			});
		});

		describe('toString', () => {});
	});
});
