import {MatcherGroup} from '../_util/matchers';
import {matcherGroupTests} from '../_util/matchers';
import {Ruleset} from '../../src/ruleset';

const ruleset = new Ruleset<number>();
const value = ruleset.value();

const MATCHER_GROUPS: MatcherGroup[] = [
	{
		opName: 'between',
		cases: [
			{
				block: value.is.between(0, 10),
				matcherValue: '0 and 10',
				input: 1,
				outcome: 'pass'
			},
			{
				block: value.is.between(0, 0),
				matcherValue: '0 and 0',
				input: 0,
				outcome: 'fail'
			},
			{
				block: value.is.between(0.1, 0.3),
				matcherValue: '0.1 and 0.3',
				input: 0.2,
				outcome: 'pass'
			},
			{
				block: value.is.between(0, 10),
				matcherValue: '0 and 10',
				input: true,
				outcome: 'fail'
			},
			{
				block: value.is.between(0, 10),
				matcherValue: '0 and 10',
				input: false,
				outcome: 'fail'
			},
			{
				block: value.is.between(0, 10),
				matcherValue: '0 and 10',
				input: [],
				inputLabel: '[]',
				outcome: 'fail'
			},
			{
				block: value.is.between(0, 10),
				matcherValue: '0 and 10',
				input: {},
				inputLabel: '{}',
				outcome: 'fail'
			},
			{
				block: value.is.between(0, 10),
				matcherValue: '0 and 10',
				input: [1, 2],
				inputLabel: '[1, 2]',
				outcome: 'fail'
			},
			{
				block: value.is.between(-1, 1),
				matcherValue: '-1 and 1',
				input: 0,
				outcome: 'pass'
			},
			{
				block: value.is.between(-2000, 2000),
				matcherValue: '-2000 and 2000',
				input: Number.MIN_SAFE_INTEGER,
				inputLabel: 'MIN_SAFE_INTEGER',
				outcome: 'fail'
			},
			{
				block: value.is.between(-1000, 1000),
				matcherValue: '-1 and 1',
				input: Number.MAX_SAFE_INTEGER,
				inputLabel: 'MAX_SAFE_INTEGER',
				outcome: 'fail'
			},
			{
				block: value.is.between(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER),
				matcherValue: 'MIN_SAFE_INTEGER and MAX_SAFE_INTEGER',
				input: 0,
				outcome: 'pass'
			},
			{
				block: value.is.between(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER),
				matcherValue: 'MIN_SAFE_INTEGER and MAX_SAFE_INTEGER',
				input: 10000,
				outcome: 'pass'
			},
			{
				block: value.is.between(Number.NaN, 100),
				matcherValue: 'NaN and 100',
				input: 1,
				outcome: 'fail'
			},
			{
				block: value.is.between(0, Number.NaN),
				matcherValue: '0 and NaN',
				input: 1,
				outcome: 'fail'
			},
			{
				block: value.is.between(Number.NaN, Number.NaN),
				matcherValue: 'NaN and NaN',
				input: 1,
				outcome: 'fail'
			},
			{
				block: value.is.between(Number.NaN, Number.NaN),
				matcherValue: 'NaN and NaN',
				input: Number.NaN,
				inputLabel: 'NaN',
				outcome: 'fail'
			},
			{
				block: value.is.between(Number.NaN, Number.NaN),
				matcherValue: 'NaN and NaN',
				input: 1,
				outcome: 'fail'
			},
			{
				block: value.is.between(-9, 9),
				matcherValue: '-9 and 9',
				input: Number.NaN,
				outcome: 'fail'
			},
			{
				block: value.is.between(null as any, 9),
				matcherValue: 'null and 9',
				input: 8,
				outcome: 'fail'
			},
			{
				block: value.is.between(-11, 11),
				matcherValue: '-11 and 11',
				input: null as any,
				outcome: 'fail'
			},
			{
				block: value.is.between(undefined as any, 9),
				matcherValue: 'undefined and 9',
				input: 8,
				outcome: 'fail'
			},
			{
				block: value.is.between(3, null as any),
				matcherValue: '3 and null',
				input: 4,
				outcome: 'fail'
			},
			{
				block: value.is.between(3, undefined as any),
				matcherValue: '3 and undefined',
				input: 5,
				outcome: 'fail'
			},
			{
				block: value.is.between(-15, 15),
				matcherValue: '-15 and 15',
				input: undefined as any,
				outcome: 'fail'
			},
			{
				block: value.is.between(-91, -11),
				matcherValue: '-91 and -11',
				input: 5,
				outcome: 'fail'
			},
			{
				block: value.is.between(-50, -40),
				matcherValue: '-50 and -40',
				input: -44,
				outcome: 'pass'
			}
		]
	}
];

describe('Rulesets - between', () => {
	matcherGroupTests(MATCHER_GROUPS);
});
