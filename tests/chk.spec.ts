import {Ruleset} from '../src/chk';
import {rulesetMk} from '../src/ruleset/mk';

const ROOT_CONSTRAINTS: string[] = ['is', 'be', 'have', 'match'];

describe('Ruleset', () => {
	let instance: Ruleset<string>;
	let chkStr: Ruleset<string>;

	beforeAll(() => {
		instance = chkMk<string>();
		chkStr = chkMk<string>();
	});

	it(`should return a new object each call`, () => {
		const chk1 = chkMk<string>();
		const result2 = chkMk<string>();

		chk1.must.be.greaterThan(311);

		expect(chk1).not.toBe(result2);
	});

	/**
	describe('Root Constraints', () => {
		const root = chkMk<string>();

		for (const constraint of ROOT_CONSTRAINTS) {
			it(`should define constraint '${constraint}'`, () => {
				expect(root).toHaveProperty(constraint);
			});
		}
	});
	**/
});
