import {Ruleset} from '../src/ruleset';
import {value} from '../src/value';

const EMPTY_STRING = '';

describe('Rulesets', () => {
	describe('Math', () => {
		let ruleset: Ruleset<number>;

		beforeAll(() => {
			ruleset = new Ruleset<number>();
		});

		describe(`lessThan should pass execution when`, () => {
			it(`0 < lessThan(1)`, async () => {
				const custom = new Ruleset<number>();
				custom.add(value.is.lessThan(1));

				const result = await custom.execute(0);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.ok()).toBe(true);
				expect(result.data?.outcome).toBe('pass');
			});

			it(`-1 < lessThan(0)`, async () => {
				const custom = new Ruleset<number>();
				custom.add(value.is.lessThan(0));

				const result = await custom.execute(-1);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.ok()).toBe(true);
				expect(result.data?.outcome).toBe('pass');
			});

			it(`-10 < lessThan(-5)`, async () => {
				const custom = new Ruleset<number>();
				custom.add(value.is.lessThan(0));

				const result = await custom.execute(-1);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.ok()).toBe(true);
				expect(result.data?.outcome).toBe('pass');
			});
		});

		describe('should fail executing non-finite numbers', () => {
			it(`Positive Infinity < lessThan(1)`, async () => {
				const custom = new Ruleset<number>();
				custom.add(value.is.lessThan(1));

				const result = await custom.execute(Number.POSITIVE_INFINITY);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.ok()).toBe(true);
				expect(result.data?.outcome).toBe('fail');
			});

			it(`Negative Infinity < lessThan(1)`, async () => {
				const custom = new Ruleset<number>();
				custom.add(value.is.lessThan(1));

				const result = await custom.execute(Number.NEGATIVE_INFINITY);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.ok()).toBe(true);
				expect(result.data?.outcome).toBe('fail');
			});

			it(`NaN < lessThan(1)`, async () => {
				const custom = new Ruleset<number>();
				custom.add(value.is.lessThan(1));

				const result = await custom.execute(Number.NaN);

				expect(result.errorCode()).toBe(EMPTY_STRING);
				expect(result.ok()).toBe(true);
				expect(result.data?.outcome).toBe('fail');
			});
		});
	});
});
