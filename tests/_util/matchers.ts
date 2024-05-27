import {stringValue} from '@toreda/strong-types';
import {BlockLink} from '../../src/block/link';
import {type Outcome} from '../../src/outcome';
import {Ruleset} from '../../src/ruleset';

const EMPTY_STRING = '';
export interface MatcherTest {
	block: BlockLink<any>;
	inputLabel?: string;
	input: any;
	errorCode?: string;
	outcome: Outcome;
	fateResult?: boolean;
	matcherValue?: any;
}

export interface MatcherGroup {
	fnName?: string;
	fn?: string;
	opName: string;
	cases: MatcherTest[];
}

export function matcherGroupTests(groups: MatcherGroup[]): void {
	for (const group of groups) {
		const fnName = stringValue(group.fnName, 'matcher');

		describe(fnName, () => {
			let ruleset: Ruleset<any>;

			beforeAll(() => {
				ruleset = new Ruleset<any>();
			});

			beforeEach(() => {
				ruleset.reset();
			});

			for (const testCase of group.cases) {
				const input = stringValue(testCase.inputLabel, `${testCase.input}`);

				let action = ``;
				if (typeof group.fn === 'string') {
					action = `${group.fn}(${input})`;
				} else {
					action = `${input} ${group.opName} ${testCase.matcherValue}`;
				}

				it(`should ${testCase.outcome}: ${action}`, async () => {
					ruleset.add(testCase.block);

					const result = await ruleset.verify(testCase.input);

					const expectedFateResult =
						typeof testCase.fateResult === 'boolean' ? testCase.fateResult : true;

					if (testCase.errorCode) {
						expect(result.errorCode()).toBe(testCase.errorCode);
					} else {
						expect(result.errorCode()).toBe(EMPTY_STRING);
					}

					expect(result.ok()).toBe(expectedFateResult);
					expect(result.data?.outcome).toBe(testCase.outcome);
				});
			}
		});
	}
}
