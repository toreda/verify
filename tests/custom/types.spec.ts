import {Levels, Log} from '@toreda/log';
import {CustomTypes} from '../../src/custom/types';
import {type SampleData, SampleSchema} from '../_data/schema';
import {type Primitive} from '@toreda/types';
import {CustomTypeVerifier} from '../../src/custom/type/verifier';
import {Fate} from '@toreda/fate';

describe('CustomTypes', () => {
	let base: Log;
	let instance: CustomTypes<Primitive, SampleData, SampleData>;

	beforeAll(() => {
		base = new Log({
			globalLevel: Levels.ALL,
			groupsStartEnabled: true,
			consoleEnabled: true
		});

		instance = new CustomTypes({
			base: base
		});
	});

	beforeEach(() => {
		instance.reset();
	});

	describe('Constructor', () => {
		it(`should not throw when init.data is undefuned`, () => {
			expect(() => {
				const _ctor = new CustomTypes({
					base: base
				});
			}).not.toThrow();
		});

		it(`should not throw when init.data is null`, () => {
			expect(() => {
				const _ctor = new CustomTypes({
					base: base,
					data: null as any
				});
			}).not.toThrow();
		});

		it(`should register types provided by init.data`, () => {
			const schema = new SampleSchema(base);
			const custom = new CustomTypes({
				base: base,
				data: {
					bt4: schema
				}
			});

			expect(custom.has('bt4')).toBe(true);
		});

		it(`should register schema provided by init.data`, () => {
			const schema = new SampleSchema(base);
			const custom = new CustomTypes({
				base: base,
				data: {
					bt8: schema
				}
			});

			expect(custom.has('bt8')).toBe(true);
			const result = custom.getSchema('bt8');
			expect(result).not.toBeUndefined();
			expect(result).toBe(schema);
		});

		it(`should start with no custom types registered when customType init data is an empty object`, () => {
			const custom = new CustomTypes({
				base: base,
				data: {}
			});

			expect(custom.registered.size).toBe(0);
		});
	});

	describe('Implementation', () => {
		describe('getVerifier', () => {
			it(`should return null when no registered verifier matching id`, async () => {
				expect(instance.registered.size).toBe(0);
				expect(instance.getVerifier('aaaaaaaa9715947597337943')).toBeNull();
			});

			it(`should return null when id arg is null`, () => {
				expect(instance.getVerifier(null as any)).toBeNull();
			});

			it(`should return null when id arg is undefined`, () => {
				expect(instance.getVerifier(undefined)).toBeNull();
			});

			it(`should return null when registered id matches a schema, not a verifier`, () => {
				const id = 'j41-09008r97359735';
				const sample = new SampleSchema(base);
				expect(instance.registered.size).toBe(0);
				instance.registerSchema(id, sample);
				expect(instance.registered.size).toBe(1);

				expect(instance.getVerifier(id)).toBeNull();
			});

			it(`should return verifier whehn id matches a valid verifier`, () => {
				const id = 'aa-957359735937';

				const verifier: CustomTypeVerifier<any> = async (): Promise<Fate<boolean>> => {
					const fate = new Fate<boolean>();
					return fate.setSuccess(true);
				};

				expect(instance.registered.size).toBe(0);
				instance.registerVerifier(id, verifier);
				expect(instance.registered.size).toBe(1);

				const result = instance.getVerifier(id);
				expect(typeof result).toBe('function');
				expect(result).toEqual(verifier);
			});
		});
	});
});
