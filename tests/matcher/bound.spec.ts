import {MatcherBound} from '../../src/matcher/bound';
import {Predicate} from '../../src/predicate';

const EMPTY_STRING = '';

describe('MatcherBound', () => {
	let instance: MatcherBound<string>;
	let predicate: Predicate<string>;

	beforeAll(() => {
		predicate = async (value?: string | null): Promise<boolean> => {
			return value === 'STRING';
		};

		instance = new MatcherBound<string>({
			fn: predicate
		});
	});

	beforeEach(() => {
		instance.flags.invertResult = false;
	});

	describe('Constructor', () => {
		it(`should set fn property to the provided call.fn arg`, () => {
			const func = jest.fn().mockImplementation(() => {
				return true;
			});

			const custom = new MatcherBound({
				fn: func
			});

			expect(custom.predicate).toStrictEqual(func);
		});

		it(`should set flags property to the provided call.fn arg`, () => {
			const func = jest.fn().mockImplementation(() => {
				return true;
			});

			const flags = {
				a: 'aaaa',
				b: 4719714,
				c: 88819187
			};

			const custom = new MatcherBound({
				fn: func
			});

			expect(custom.flags).toStrictEqual(flags);
		});
	});

	describe('Implementation', () => {
		describe('mkFlags', () => {
			it(`should return object with 'invertResult' property set to false with no args provided`, () => {
				const flags = instance.mkFlags(undefined);
				expect(flags).toHaveProperty('invertResult');
				expect(flags.invertResult).toBe(false);
			});

			it(`should return object with 'invertResult' property set to false when input.invertResult arg is a falsy non-string`, () => {
				const flags = instance.mkFlags({
					invertResult: 0 as any
				});
				expect(flags).toHaveProperty('invertResult');
				expect(flags.invertResult).toBe(false);
			});

			it(`should return object with 'invertResult' property set to false when input.invertResult arg is a truthy non-string`, () => {
				const flags = instance.mkFlags({
					invertResult: 1455 as any
				});
				expect(flags).toHaveProperty('invertResult');
				expect(flags.invertResult).toBe(false);
			});

			it(`should return object with 'invertResult' property set to false when input.invertResult arg is false`, () => {
				const flags = instance.mkFlags({
					invertResult: false
				});
				expect(flags).toHaveProperty('invertResult');
				expect(flags.invertResult).toBe(false);
			});

			it(`should return object with 'invertResult' property set to false when input.invertResult arg is true`, () => {
				const flags = instance.mkFlags({
					invertResult: true
				});
				expect(flags).toHaveProperty('invertResult');
				expect(flags.invertResult).toBe(true);
			});
		});

		describe('applyMods', () => {
			it(`should return false when result is false and invertResult is also false`, () => {
				instance.flags.invertResult = false;
				const result = instance.applyMods(false);

				expect(result).toBe(false);
			});

			it(`should return true when result is true and invertResult is also false`, () => {
				instance.flags.invertResult = true;
				const result = instance.applyMods(false);

				expect(result).toBe(true);
			});

			it(`should return false when result is true but invertResult is true`, () => {
				instance.flags.invertResult = true;
				const result = instance.applyMods(true);

				expect(result).toBe(false);
			});

			it(`should return true when result is false but invertResult is true`, () => {
				instance.flags.invertResult = true;
				const result = instance.applyMods(false);

				expect(result).toBe(true);
			});
		});

		describe('execute', () => {
			it(`should execute stored matcher function using provided value arg`, async () => {
				const spy = jest.spyOn(instance, 'execute');
				expect(spy).not.toHaveBeenCalled();
				const value = 'aaa1';
				await instance.execute(value);

				expect(spy).toHaveBeenCalledTimes(1);
				spy.mockRestore();
			});

			it(`should fail without throwing when matcher func throws`, async () => {
				const fn = jest.fn().mockImplementation(() => {
					throw new Error('mock fn throw');
				});
				const custom = new MatcherBound({
					fn: fn,
					flags: {}
				});

				const result = await custom.execute('aaa');
				expect(result.success()).toBe(false);
				expect(result.errorCode()).toBe('exception');
			});

			it(`should return false when matcher suceeds but returns false`, async () => {
				const func = jest.fn().mockImplementation(() => {
					return false;
				});
				const custom = new MatcherBound({
					fn: func,
					flags: {}
				});

				const result = await custom.execute('aaa');
				expect(result.ok()).toBe(true);
				expect(result.data).toBe(false);
				expect(result.errorCode()).toBe(EMPTY_STRING);
			});

			it(`should succeed' when matcher returns true`, async () => {
				const fn = jest.fn().mockImplementation(() => {
					return true;
				});
				const custom = new MatcherBound({
					fn: fn,
					flags: {}
				});

				const result = await custom.execute('aaa');
				expect(result.success()).toBe(true);
				expect(result.errorCode()).toBe(EMPTY_STRING);
			});
		});
	});
});
