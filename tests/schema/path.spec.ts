import Defaults from '../../src/defaults';
import {Tracer} from '../../src/tracer';

const EMPTY_STRING = '';
const EMPTY_ARRAY: string[] = [];

describe('Tracer', () => {
	describe('Constructor', () => {
		it(`should initialize path to an empty array when init arg is undefined`, () => {
			const custom = new Tracer();

			expect(Array.isArray(custom.path)).toBe(true);
			expect(custom.path.length).toBe(0);
		});

		it(`should initialize pathSeparator to Tracer default when init arg is undefined`, () => {
			const custom = new Tracer();

			expect(custom.pathSeparator).toBe(Defaults.Tracer.PathSeparator);
		});

		it(`should initialize path to an empty array when init arg is null`, () => {
			const custom = new Tracer(null as any);

			expect(Array.isArray(custom.path)).toBe(true);
			expect(custom.path.length).toBe(0);
		});

		it(`should initialize pathSeparator to Tracer default when init arg is null`, () => {
			const custom = new Tracer(null as any);

			expect(custom.pathSeparator).toBe(Defaults.Tracer.PathSeparator);
		});

		it(`should initialize path to an empty array when init.path is undefined`, () => {
			const custom = new Tracer({
				pathSeparator: '.'
			});

			expect(Array.isArray(custom.path)).toBe(true);
			expect(custom.path.length).toBe(0);
		});

		it(`should initialize pathSeparator to Tracer default when init.pathSeparator is undefined`, () => {
			const custom = new Tracer({
				pathSeparator: undefined
			});

			expect(custom.pathSeparator).toBe(Defaults.Tracer.PathSeparator);
		});

		it(`should initialize path to an empty array when init.path is null`, () => {
			const custom = new Tracer({
				path: null as any,
				pathSeparator: '.'
			});

			expect(Array.isArray(custom.path)).toBe(true);
			expect(custom.path.length).toBe(0);
		});

		it(`should initialize pathSeparator to Tracer default when init.pathSeparator is null`, () => {
			const custom = new Tracer({
				pathSeparator: null as any
			});

			expect(custom.pathSeparator).toBe(Defaults.Tracer.PathSeparator);
		});

		it(`should initialize pathSeparator to provided multi-character string value`, () => {
			const value = '___';
			const custom = new Tracer({
				pathSeparator: value
			});

			expect(custom.pathSeparator).toBe(value);
		});

		it(`should initialize pathSeparator to provided single character string value`, () => {
			const value = '+';
			const custom = new Tracer({
				pathSeparator: value
			});

			expect(custom.pathSeparator).toBe(value);
		});
	});

	describe('Implementation', () => {
		describe('current', () => {
			it(`should return the stored path elements as a string`, () => {
				const a = 'a097549735';
				const b = 'b908797245';
				const c = 'c449797733';

				const custom = new Tracer({
					path: [a, b, c]
				});

				expect(custom.current()).toBe(`${a}.${b}.${c}`);
			});

			it(`should return an empty string when path array is empty`, () => {
				const custom = new Tracer();
				expect(custom.path).toEqual(EMPTY_ARRAY);
				expect(custom.current()).toBe(EMPTY_STRING);
			});

			it(`should return path when path array contains one element`, () => {
				const value = 'ab83108';
				const custom = new Tracer({
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
					const custom = new Tracer({
						pathSeparator: sep,
						path: [a, b, c]
					});

					expect(custom.current()).toBe(`${a}${sep}${b}${sep}${c}`);
				}
			});
		});

		describe('child', () => {
			it(`should return the called object when id arg is undefined`, () => {
				const first = new Tracer({
					path: ['g2', 'd2', 'f2']
				});
				const child = first.child(undefined as any);

				expect(child).toStrictEqual(first);
			});

			it(`should return the called object when id arg is null`, () => {
				const first = new Tracer({
					path: ['g3', 'd3', 'f3']
				});
				const child = first.child(EMPTY_STRING);

				expect(child).toStrictEqual(first);
			});

			it(`should return the called object when id arg is an empty string`, () => {
				const first = new Tracer({
					path: ['g3', 'd3', 'f3']
				});
				const child = first.child(EMPTY_STRING);

				expect(child).toStrictEqual(first);
			});

			it(`should return a new Tracer copy that includes id arg`, () => {
				const pathA = new Tracer({
					path: ['a', 'b', 'c'],
					pathSeparator: '+'
				});
				const pathB = pathA.child('d');

				expect(pathB.current()).toBe('a+b+c+d');
			});
		});
	});
});
