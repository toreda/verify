import {value} from '../../../src/value';
import {MatcherGroup} from '../../_util/matchers';
import {matcherGroupTests} from '../../_util/matchers';

const EMPTY_STRING = '';

const MATCHER_GROUPS: MatcherGroup[] = [
	{
		fnName: 'divisibleBy',
		opName: '/',
		cases: [
			{
				block: value.is.divisibleBy(10),
				matcherValue: `10`,
				input: 100,
				outcome: 'pass'
			},
			{
				block: value.is.divisibleBy(100),
				matcherValue: `100`,
				input: 10,
				outcome: 'fail'
			},
			{
				block: value.is.divisibleBy(0),
				matcherValue: `0`,
				input: 100,
				outcome: 'fail'
			},
			{
				block: value.is.divisibleBy(0),
				matcherValue: `0`,
				input: 0,
				outcome: 'fail'
			},
			{
				block: value.is.divisibleBy(3),
				matcherValue: `3`,
				input: 9,
				outcome: 'pass'
			},
			{
				block: value.is.divisibleBy(3.33871),
				matcherValue: `3.33871`,
				input: 9,
				outcome: 'fail'
			},
			{
				block: value.is.divisibleBy(-3),
				matcherValue: `-3`,
				input: 9,
				outcome: 'pass'
			},
			{
				block: value.is.divisibleBy(1),
				matcherValue: `1`,
				input: 9,
				outcome: 'pass'
			},
			{
				block: value.is.divisibleBy(1),
				matcherValue: `1`,
				input: 1,
				outcome: 'pass'
			},
			{
				block: value.is.divisibleBy(111),
				matcherValue: `111`,
				input: 111,
				outcome: 'pass'
			},
			{
				block: value.is.divisibleBy(1),
				matcherValue: `1`,
				input: Number.NaN,
				outcome: 'fail'
			},
			{
				block: value.is.divisibleBy(Number.NaN),
				matcherValue: `NaN`,
				input: Number.NaN,
				outcome: 'fail'
			},
			{
				block: value.is.divisibleBy(Number.NaN),
				matcherValue: `NaN`,
				input: 10,
				outcome: 'fail'
			},
			{
				block: value.is.divisibleBy(null as any),
				matcherValue: `null`,
				input: Number.NaN,
				outcome: 'fail'
			},
			{
				block: value.is.divisibleBy(undefined as any),
				matcherValue: `undefined`,
				input: Number.NaN,
				outcome: 'fail'
			},
			{
				block: value.is.divisibleBy(undefined as any),
				matcherValue: `undefined`,
				input: 13,
				outcome: 'fail'
			},
			{
				block: value.is.divisibleBy(null as any),
				matcherValue: `null`,
				input: 13,
				outcome: 'fail'
			},
			{
				block: value.is.divisibleBy(Number.POSITIVE_INFINITY),
				matcherValue: `+∞`,
				input: 1,
				outcome: 'fail'
			},
			{
				block: value.is.divisibleBy(1),
				matcherValue: `1`,
				input: Number.NEGATIVE_INFINITY,
				inputLabel: '-∞',
				outcome: 'fail'
			},
			{
				block: value.is.divisibleBy(Number.POSITIVE_INFINITY),
				matcherValue: `+∞`,
				input: Number.POSITIVE_INFINITY,
				inputLabel: '+∞',
				outcome: 'fail'
			},
			{
				block: value.is.divisibleBy(Number.POSITIVE_INFINITY),
				matcherValue: `+∞`,
				input: Number.NEGATIVE_INFINITY,
				inputLabel: '-∞',
				outcome: 'fail'
			},
			{
				block: value.is.divisibleBy(Number.NEGATIVE_INFINITY),
				matcherValue: `-∞`,
				input: Number.POSITIVE_INFINITY,
				inputLabel: '+∞',
				outcome: 'fail'
			},
			{
				block: value.is.divisibleBy(Number.NEGATIVE_INFINITY),
				matcherValue: `-∞`,
				input: Number.NEGATIVE_INFINITY,
				inputLabel: '-∞',
				outcome: 'fail'
			},
			{
				block: value.is.divisibleBy(Number.NEGATIVE_INFINITY),
				matcherValue: `-∞`,
				input: 1,
				outcome: 'fail'
			},
			{
				block: value.is.divisibleBy(Number.NEGATIVE_INFINITY),
				matcherValue: `-∞`,
				input: -1,
				outcome: 'fail'
			},
			{
				block: value.is.divisibleBy(-1),
				matcherValue: `-1`,
				input: Number.NEGATIVE_INFINITY,
				inputLabel: '-∞',
				outcome: 'fail'
			}
		]
	}
];

describe('Rulesets - divisibleBy', () => {
	matcherGroupTests(MATCHER_GROUPS);
});
