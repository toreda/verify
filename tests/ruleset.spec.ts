import {Ruleset} from '../src/ruleset';

describe('Ruleset', () => {
	let instance: Ruleset<string>;

	beforeAll(() => {
		instance = new Ruleset<string>();
	});

	beforeEach(() => {
		instance.reset();
	});

	describe('Constructor', () => {
		let ctorInstance: Ruleset<string>;

		beforeAll(() => {
			ctorInstance = new Ruleset<string>();
		});

		it(`should initialize rules to an empty array`, () => {
			expect(Array.isArray(ctorInstance.rules)).toBe(true);
			expect(ctorInstance.rules).toHaveLength(0);
		});
	});

	describe('Implementation', () => {
		describe('value()', () => {
			it(`should return a value object that can be used to create rules`, () => {
				const custom = new Ruleset<string>();
				const value = custom.value();

				expect(value).not.toBeUndefined();

				expect(custom.rules).toHaveLength(0);
				custom.add(value.must.be.an.array());
				expect(custom.rules).toHaveLength(1);
			});
		});
	});
});
