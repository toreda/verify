import {value} from '../../../src/value';
import {MatcherGroup} from '../../_util/matchers';
import {matcherGroupTests} from '../../_util/matchers';

const EMPTY_STRING = '';

const MATCHER_GROUPS: MatcherGroup[] = [
	{
		fnName: 'lessThan',
		opName: '>',
		cases: [
			{
				block: value.is.greaterThan(true as any),
				matcherValue: 'true',
				input: true,
				outcome: 'fail'
			},
			{
				block: value.is.greaterThan(false as any),
				matcherValue: 'false',
				input: true,
				outcome: 'fail'
			},
			{
				block: value.is.greaterThan(true as any),
				matcherValue: 'true',
				input: false,
				outcome: 'fail'
			},
			{
				block: value.is.greaterThan(false as any),
				matcherValue: 'false',
				input: false,
				outcome: 'fail'
			},
			{
				block: value.is.greaterThan(EMPTY_STRING as any),
				matcherValue: 'empty string',
				input: EMPTY_STRING,
				inputLabel: 'empty string',
				outcome: 'fail'
			},
			{
				block: value.is.greaterThan(12),
				matcherValue: '12',
				input: EMPTY_STRING,
				inputLabel: 'empty string',
				outcome: 'fail'
			},
			{
				block: value.is.greaterThan(undefined as any),
				matcherValue: 'undefined',
				input: 0,
				outcome: 'fail'
			},
			{
				block: value.is.greaterThan(null as any),
				matcherValue: 'null',
				input: null,
				outcome: 'fail'
			},
			{
				block: value.is.greaterThan(undefined as any),
				matcherValue: 'undefined',
				input: undefined,
				outcome: 'fail'
			},
			{
				block: value.is.greaterThan(0),
				matcherValue: '0',
				input: null as any,
				outcome: 'fail'
			},
			{
				block: value.is.greaterThan(0),
				matcherValue: '0',
				input: undefined as any,
				outcome: 'fail'
			},
			{
				block: value.is.greaterThan(1),
				matcherValue: 1,
				input: 0,
				outcome: 'fail'
			},
			{
				block: value.is.greaterThan(-1),
				matcherValue: -1,
				input: 0,
				outcome: 'pass'
			},
			{
				block: value.is.greaterThan(-1),
				matcherValue: 1,
				input: 1,
				outcome: 'pass'
			},
			{
				block: value.is.greaterThan(1.1),
				matcherValue: 1.1,
				input: 1.2,
				outcome: 'pass'
			},
			{
				block: value.is.greaterThan(-1.2),
				matcherValue: -1.2,
				input: -1.1,
				outcome: 'pass'
			},
			{
				block: value.is.greaterThan(-100),
				matcherValue: -100,
				input: -10,
				outcome: 'pass'
			},
			{
				block: value.is.greaterThan(0),
				matcherValue: 0,
				input: 0.0001,
				outcome: 'pass'
			},
			{
				block: value.is.greaterThan(-0.0001),
				matcherValue: -0.0001,
				input: 0.0001,
				outcome: 'pass'
			},
			{
				block: value.is.greaterThan(Number.MAX_VALUE),
				matcherValue: 'Max Value',
				input: -1,
				outcome: 'fail'
			},
			{
				block: value.is.greaterThan(Number.MAX_SAFE_INTEGER - 1),
				matcherValue: 'Max Value - 1',
				inputLabel: 'Number.MAX_SAFE_INTEGER',
				input: Number.MAX_SAFE_INTEGER,
				outcome: 'pass'
			},
			{
				block: value.is.greaterThan(EMPTY_STRING as any),
				matcherValue: 'empty string',
				input: 1,
				outcome: 'fail'
			},
			{
				block: value.is.greaterThan(1),
				matcherValue: '1',
				input: 1,
				outcome: 'fail'
			},
			{
				block: value.is.greaterThan(0),
				matcherValue: '0',
				input: 0,
				outcome: 'fail'
			}
		]
	}
];

describe('Rulesets - lessThan', () => {
	matcherGroupTests(MATCHER_GROUPS);
});
