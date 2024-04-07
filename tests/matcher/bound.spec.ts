import {BlockFlags} from '../../src';
import {MatcherCallable} from '../../src/matcher/callable';
import {Predicate} from '../../src/predicate';

const EMPTY_STRING = '';

describe('MatcherCallable', () => {
	let instance: MatcherCallable<string>;
	let predicate: Predicate<string>;

	beforeAll(() => {
		predicate = async (value?: string | null): Promise<boolean> => {
			return value === 'STRING';
		};

		instance = new MatcherCallable<string>(8, {
			fn: predicate,
			name: 'matcher'
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

			const custom = new MatcherCallable(9, {
				fn: func,
				name: 'matcher'
			});

			expect(custom.predicate).toStrictEqual(func);
		});

		it(`should set only supported flags`, () => {
			const func = jest.fn().mockImplementation(() => {
				return true;
			});

			const flags: BlockFlags = {
				a: 'aaaa',
				b: 4719714,
				c: 88819187,
				invertResult: true
			};

			const custom = new MatcherCallable(10, {
				fn: func,
				name: 'matcher',
				flags: flags
			});

			expect(custom.flags).toHaveProperty('invertResult');
			expect(custom.flags.invertResult).toBe(true);
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

		describe('verify', () => {
			it(`should verify stored matcher function using provided value arg`, async () => {
				const spy = jest.spyOn(instance, 'verify');
				expect(spy).not.toHaveBeenCalled();
				const value = 'aaa1';
				await instance.verify(value);

				expect(spy).toHaveBeenCalledTimes(1);
				spy.mockRestore();
			});

			it(`should fail without throwing when matcher func throws`, async () => {
				const fn = jest.fn().mockImplementation(() => {
					throw new Error('mock fn throw');
				});
				const custom = new MatcherCallable(11, {
					fn: fn,
					name: 'matcher',
					flags: {}
				});

				const result = await custom.verify('aaa');
				expect(result.success()).toBe(false);
				expect(result.errorCode()).toBe('exception');
			});

			it(`should return false when matcher fails`, async () => {
				const func = jest.fn().mockImplementation(() => {
					return false;
				});
				const custom = new MatcherCallable(12, {
					fn: func,
					name: 'matcher',
					flags: {}
				});

				const result = await custom.verify('aaa');
				expect(result.ok()).toBe(true);
				expect(result.data?.outcome).toBe('fail');
				expect(result.errorCode()).toBe(EMPTY_STRING);
			});

			it(`should succeed when matcher returns true`, async () => {
				const fn = jest.fn().mockImplementation(() => {
					return true;
				});
				const custom = new MatcherCallable(13, {
					fn: fn,
					name: 'matcher',
					flags: {}
				});

				const result = await custom.verify('aaa');
				expect(result.ok()).toBe(true);
				expect(result.errorCode()).toBe(EMPTY_STRING);
			});
		});
	});
});
