import Defaults from '../src/defaults';
import {Tracer} from '../src/tracer';

const EMPTY_STRING = '';
const EMPTY_ARRAY: string[] = [];

describe('Tracer', () => {
	let instance: Tracer;
	beforeAll(() => {
		instance = new Tracer();
	});

	beforeEach(() => {
		instance.reset();
	});

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

		describe('targetLabel', () => {
			it(`should use default target obj name when taretObjName is an empty string`, () => {
				instance.targetObjName(EMPTY_STRING);
				expect(instance.targetObjName()).toBe(EMPTY_STRING);
				const result = instance.targetLabel();
				expect(result).toBe(Defaults.Tracer.TargetObjName);
			});

			it(`should return targetObjName only when targetPropName is an empty string`, () => {
				const value = '41867-861486148164';
				instance.targetObjName(value);
				instance.targetPropName(EMPTY_STRING);
				expect(instance.targetPropName()).toBe(EMPTY_STRING);
				const result = instance.targetLabel();
				expect(result).toBe(value);
			});

			it(`should return obj.prop when targetPropValue has no value`, () => {
				instance.targetPropValue(null);
				const obj = 'aa-917149714';
				const prop = 'bb-H97546!';
				instance.targetObjName(obj);
				instance.targetPropName(prop);

				const result = instance.targetLabel();
				expect(result).toBe(`${obj}.${prop}`);
			});
		});

		describe('clearTarget', () => {
			it(`should reset targetObjName to empty string`, () => {
				const value = '13-8901974';
				instance.targetObjName(value);

				expect(instance.targetObjName()).toBe(value);
				instance.clearTarget();
				expect(instance.targetObjName()).toBe(EMPTY_STRING);
			});

			it(`should reset targetPropName to empty string`, () => {
				const value = '8J-BBK4108100091';
				instance.targetPropName(value);

				expect(instance.targetPropName()).toBe(value);
				instance.clearTarget();
				expect(instance.targetPropName()).toBe(EMPTY_STRING);
			});
		});

		describe('addParam', () => {
			it(`should add param to an empty params array`, () => {
				const value = 'ff8-1971497145';
				expect(instance.params.includes(value)).toBe(false);

				instance.addParam(value);
				expect(instance.params.includes(value)).toBe(true);
			});
		});

		describe('reset', () => {
			it(`should reset value to null`, () => {
				const value = '44-097101087';
				instance.value(value);
				expect(instance.value.getNull()).toBe(value);
				instance.reset();
				expect(instance.value.getNull()).toBeNull();
			});

			it(`should reset targetObjName to empty string`, () => {
				const value = '81-7791900091';
				instance.targetObjName(value);

				expect(instance.targetObjName()).toBe(value);
				instance.reset();
				expect(instance.targetObjName()).toBe(EMPTY_STRING);
			});

			it(`should reset targetPropName to empty string`, () => {
				const value = '89-7GL4100091';
				instance.targetPropName(value);

				expect(instance.targetPropName()).toBe(value);
				instance.reset();
				expect(instance.targetPropName()).toBe(EMPTY_STRING);
			});

			it(`should reset params array`, () => {
				instance.addParam('aaa', 'bbb', 'ccc');
				expect(instance.params.length).toBe(3);
				instance.reset();
				expect(instance.params.length).toBe(0);
			});
		});

		describe('valueContent', () => {
			it(`should return formatted value input when input is an empty string`, () => {
				expect(instance.valueContent(EMPTY_STRING)).toBe(` ('')`);
			});

			it(`should return formatted value when input is a number`, () => {
				const input = '441-8010853896G';
				expect(instance.valueContent(input)).toBe(` (${input})`);
			});

			it(`should return an empty string when input is non-primitive empty object`, () => {
				const input = {};
				expect(instance.valueContent(input)).toBe(EMPTY_STRING);
			});

			it(`should return an empty string when input is non-primitive empty array`, () => {
				const input = [] as any;
				expect(instance.valueContent(input)).toBe(EMPTY_STRING);
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

			it(`should return a copied Tracer object that includes id`, () => {
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
