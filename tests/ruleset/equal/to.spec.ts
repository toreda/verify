import {value} from '../../../src/value';
import {MatcherGroup} from '../../_util/matchers';
import {matcherGroupTests} from '../../_util/matchers';

const EMPTY_STRING = '';

const MATCHER_GROUPS: MatcherGroup[] = [
	{
		fnName: 'equalTo',
		opName: '===',
		cases: [
			{
				block: value.is.equalTo(['one']),
				matcherValue: `['one]`,
				input: ['one'],
				inputLabel: `['one']`,
				outcome: 'pass'
			},
			{
				block: value.is.equalTo([1]),
				matcherValue: '[1]',
				input: [1],
				inputLabel: '[1]',
				outcome: 'pass'
			},
			{
				block: value.is.equalTo([1, 1, 1]),
				matcherValue: '[1, 1, 1]',
				input: [1, 1, 1],
				inputLabel: '[1, 1, 1]',
				outcome: 'pass'
			},
			{
				block: value.is.equalTo([1, 0, 1]),
				matcherValue: '[1, 0, 1]',
				input: [1, 1, 1],
				inputLabel: '[1, 1, 1]',
				outcome: 'fail'
			},
			{
				block: value.is.equalTo([1]),
				matcherValue: '[1]',
				input: [],
				inputLabel: '[]',
				outcome: 'fail'
			},
			{
				block: value.is.equalTo([]),
				matcherValue: '[]',
				input: [1],
				inputLabel: '[1]',
				outcome: 'fail'
			},
			{
				block: value.is.equalTo([]),
				matcherValue: '[]',
				input: [],
				inputLabel: '[]',
				outcome: 'pass'
			},
			{
				block: value.is.equalTo([]),
				matcherValue: '[]',
				input: [1],
				outcome: 'fail'
			},
			{
				block: value.is.equalTo(null),
				matcherValue: 'null',
				input: Number.NaN,
				outcome: 'fail'
			},
			{
				block: value.is.equalTo(Number.NaN),
				matcherValue: 'NaN',
				input: null,
				outcome: 'fail'
			},
			{
				block: value.is.equalTo(undefined),
				matcherValue: 'undefined',
				input: Number.NaN,
				outcome: 'fail'
			},
			{
				block: value.is.equalTo(Number.NaN),
				matcherValue: 'NaN',
				input: undefined,
				outcome: 'fail'
			},

			{
				block: value.is.equalTo(Number.NaN),
				matcherValue: 'NaN',
				input: Number.NaN,
				outcome: 'pass'
			},
			{
				block: value.is.equalTo(Number.NaN),
				matcherValue: 'NaN',
				input: 1,
				outcome: 'fail'
			},
			{
				block: value.is.equalTo(Number.NaN),
				matcherValue: 'NaN',
				input: 0,
				outcome: 'fail'
			},

			{
				block: value.is.equalTo(1),
				matcherValue: '1',
				input: Number.NaN,
				outcome: 'fail'
			},
			{
				block: value.is.equalTo(0),
				matcherValue: '0',
				input: Number.NaN,
				outcome: 'fail'
			},
			{
				block: value.is.equalTo(Number.NaN),
				matcherValue: 'NaN',
				input: 0,
				outcome: 'fail'
			},

			{
				block: value.is.equalTo(null),
				matcherValue: 'null',
				input: null,
				outcome: 'pass'
			},
			{
				block: value.is.equalTo(true),
				matcherValue: 'true',
				input: true,
				outcome: 'pass'
			},
			{
				block: value.is.equalTo(false as any),
				matcherValue: 'false',
				input: true,
				outcome: 'fail'
			},
			{
				block: value.is.equalTo(true as any),
				matcherValue: 'true',
				input: false,
				outcome: 'fail'
			},
			{
				block: value.is.equalTo(false as any),
				matcherValue: 'false',
				input: false,
				outcome: 'pass'
			},
			{
				block: value.is.equalTo(EMPTY_STRING as any),
				matcherValue: 'empty string',
				input: EMPTY_STRING,
				inputLabel: 'empty string',
				outcome: 'pass'
			},
			{
				block: value.is.equalTo(12),
				matcherValue: '12',
				input: EMPTY_STRING,
				inputLabel: 'empty string',
				outcome: 'fail'
			},
			{
				block: value.is.equalTo(undefined as any),
				matcherValue: 'undefined',
				input: 0,
				outcome: 'fail'
			},
			{
				block: value.is.equalTo(undefined as any),
				matcherValue: 'undefined',
				input: undefined,
				outcome: 'fail'
			},
			{
				block: value.is.equalTo(0),
				matcherValue: '0',
				input: null as any,
				outcome: 'fail'
			},
			{
				block: value.is.equalTo(0),
				matcherValue: '0',
				input: undefined as any,
				outcome: 'fail'
			},
			{
				block: value.is.equalTo(1),
				matcherValue: 1,
				input: 0,
				outcome: 'fail'
			},
			{
				block: value.is.equalTo(-1),
				matcherValue: -1,
				input: 0,
				outcome: 'fail'
			},
			{
				block: value.is.equalTo(-1),
				matcherValue: -1,
				input: 1,
				outcome: 'fail'
			},
			{
				block: value.is.equalTo(1),
				matcherValue: '1',
				input: 1,
				outcome: 'pass'
			},
			{
				block: value.is.equalTo(0),
				matcherValue: '0',
				outcome: 'pass',
				input: 0
			},
			{
				block: value.is.equalTo(-1),
				matcherValue: -1,
				input: -1,
				outcome: 'pass'
			},
			{
				block: value.is.equalTo(1.1),
				matcherValue: 1.1,
				input: 1.2,
				outcome: 'fail'
			},
			{
				block: value.is.equalTo(1.7),
				matcherValue: 1.7,
				input: 1.7,
				outcome: 'pass'
			},
			{
				block: value.is.equalTo(-1.2),
				matcherValue: -1.2,
				input: -1.1,
				outcome: 'fail'
			},
			{
				block: value.is.equalTo(-100),
				matcherValue: -100,
				input: -10,
				outcome: 'fail'
			},
			{
				block: value.is.equalTo(100),
				matcherValue: -100,
				input: 10,
				outcome: 'fail'
			},
			{
				block: value.is.equalTo(0),
				matcherValue: 0,
				input: 0.0001,
				outcome: 'fail'
			},
			{
				block: value.is.equalTo(-0.0001),
				matcherValue: -0.0001,
				input: 0.0001,
				outcome: 'fail'
			},
			{
				block: value.is.equalTo(EMPTY_STRING as any),
				matcherValue: 'empty string',
				input: 1,
				outcome: 'fail'
			}
		]
	}
];

describe('Rulesets - equalTo', () => {
	matcherGroupTests(MATCHER_GROUPS);
});
