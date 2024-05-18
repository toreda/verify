import Defaults from '../../src/defaults';
import {SchemaPath} from '../../src/schema/path';

const EMPTY_STRING = '';
const EMPTY_ARRAY: string[] = [];

describe('SchemaPath', () => {
	describe('Constructor', () => {
		it(`should initialize path to an empty array when init arg is undefined`, () => {
			const custom = new SchemaPath();

			expect(Array.isArray(custom.path)).toBe(true);
			expect(custom.path.length).toBe(0);
		});

		it(`should initialize idSeparator to SchemaPath default when init arg is undefined`, () => {
			const custom = new SchemaPath();

			expect(custom.idSeparator).toBe(Defaults.SchemaPath.IdSeparator);
		});

		it(`should initialize path to an empty array when init arg is null`, () => {
			const custom = new SchemaPath(null as any);

			expect(Array.isArray(custom.path)).toBe(true);
			expect(custom.path.length).toBe(0);
		});

		it(`should initialize idSeparator to SchemaPath default when init arg is null`, () => {
			const custom = new SchemaPath(null as any);

			expect(custom.idSeparator).toBe(Defaults.SchemaPath.IdSeparator);
		});

		it(`should initialize path to an empty array when init.path is undefined`, () => {
			const custom = new SchemaPath({
				idSeparator: '.'
			});

			expect(Array.isArray(custom.path)).toBe(true);
			expect(custom.path.length).toBe(0);
		});

		it(`should initialize idSeparator to SchemaPath default when init.idSeparator is undefined`, () => {
			const custom = new SchemaPath({
				idSeparator: undefined
			});

			expect(custom.idSeparator).toBe(Defaults.SchemaPath.IdSeparator);
		});

		it(`should initialize path to an empty array when init.path is null`, () => {
			const custom = new SchemaPath({
				path: null as any,
				idSeparator: '.'
			});

			expect(Array.isArray(custom.path)).toBe(true);
			expect(custom.path.length).toBe(0);
		});

		it(`should initialize idSeparator to SchemaPath default when init.idSeparator is null`, () => {
			const custom = new SchemaPath({
				idSeparator: null as any
			});

			expect(custom.idSeparator).toBe(Defaults.SchemaPath.IdSeparator);
		});

		it(`should initialize idSeparator to provided multi-character string value`, () => {
			const value = '___';
			const custom = new SchemaPath({
				idSeparator: value
			});

			expect(custom.idSeparator).toBe(value);
		});

		it(`should initialize idSeparator to provided single character string value`, () => {
			const value = '+';
			const custom = new SchemaPath({
				idSeparator: value
			});

			expect(custom.idSeparator).toBe(value);
		});
	});

	describe('Implementation', () => {
		describe('current', () => {
			it(`should return the stored path elements as a string`, () => {
				const a = 'a097549735';
				const b = 'b908797245';
				const c = 'c449797733';

				const custom = new SchemaPath({
					path: [a, b, c]
				});

				expect(custom.current()).toBe(`${a}.${b}.${c}`);
			});

			it(`should return an empty string when path array is empty`, () => {
				const custom = new SchemaPath();
				expect(custom.path).toEqual(EMPTY_ARRAY);
				expect(custom.current()).toBe(EMPTY_STRING);
			});

			it(`should return path when path array contains one element`, () => {
				const value = 'ab83108';
				const custom = new SchemaPath({
					path: value
				});
				expect(custom.current()).toBe(value);
			});

			it(`should join path using the configured separator`, () => {
				const a = 'a890814';
				const b = 'b880000';
				const c = 'c333311';

				const seps = ['.', ',', '+', '-', ':', '_'];

				for (const sep of seps) {
					const custom = new SchemaPath({
						idSeparator: sep,
						path: [a, b, c]
					});

					expect(custom.current()).toBe(`${a}${sep}${b}${sep}${c}`);
				}
			});
		});

		describe('child', () => {
			it(`should return the called object when id arg is undefined`, () => {
				const first = new SchemaPath({
					path: ['g2', 'd2', 'f2']
				});
				const child = first.child(undefined as any);

				expect(child).toStrictEqual(first);
			});

			it(`should return the called object when id arg is null`, () => {
				const first = new SchemaPath({
					path: ['g3', 'd3', 'f3']
				});
				const child = first.child(EMPTY_STRING);

				expect(child).toStrictEqual(first);
			});

			it(`should return the called object when id arg is an empty string`, () => {
				const first = new SchemaPath({
					path: ['g3', 'd3', 'f3']
				});
				const child = first.child(EMPTY_STRING);

				expect(child).toStrictEqual(first);
			});

			it(`should return a new SchemaPath copy that includes id arg`, () => {
				const pathA = new SchemaPath({
					path: ['a', 'b', 'c'],
					idSeparator: '+'
				});
				const pathB = pathA.child('d');

				expect(pathB.current()).toBe('a+b+c+d');
			});
		});
	});
});
