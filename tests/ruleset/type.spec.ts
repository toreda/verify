import {MatcherGroup} from '../_util/matchers';
import {matcherGroupTests} from '../_util/matchers';
import {Ruleset} from '../../src/ruleset';

const ruleset = new Ruleset<number>();
const value = ruleset.value();

const EMPTY_STRING = '';
const MATCHER_GROUPS: MatcherGroup[] = [
	{
		opName: 'is type',
		cases: [
			{
				matcherValue: 'array',
				block: value.is.type('array'),
				input: ['one'],
				inputLabel: `['one']`,
				outcome: 'pass'
			},
			{
				matcherValue: 'array',
				block: value.is.type('array'),
				input: [],
				inputLabel: `[]`,
				outcome: 'pass'
			},
			{
				matcherValue: 'number',
				block: value.is.type('number'),
				input: [],
				inputLabel: `[]`,
				outcome: 'fail'
			},
			{
				matcherValue: 'number',
				block: value.is.type('number'),
				input: {},
				inputLabel: `{}`,
				outcome: 'fail'
			},
			{
				matcherValue: 'number',
				block: value.is.type('number'),
				input: false,
				outcome: 'fail'
			},
			{
				matcherValue: 'number',
				block: value.is.type('number'),
				input: true,
				outcome: 'fail'
			},
			{
				matcherValue: 'boolean',
				block: value.is.type('boolean'),
				input: false,
				outcome: 'pass'
			},
			{
				matcherValue: 'boolean',
				block: value.is.type('boolean'),
				input: true,
				outcome: 'pass'
			},
			{
				matcherValue: 'boolean',
				block: value.is.type('boolean'),
				input: 1,
				outcome: 'fail'
			},
			{
				matcherValue: 'boolean',
				block: value.is.type('boolean'),
				input: 0,
				outcome: 'fail'
			},
			{
				matcherValue: 'boolean',
				block: value.is.type('boolean'),
				input: [],
				inputLabel: '[]',
				outcome: 'fail'
			},
			{
				matcherValue: 'boolean',
				block: value.is.type('boolean'),
				input: {},
				inputLabel: '{}',
				outcome: 'fail'
			},
			{
				matcherValue: 'string',
				block: value.is.type('string'),
				input: 0,
				outcome: 'fail'
			},
			{
				matcherValue: 'string',
				block: value.is.type('string'),
				input: 1,
				outcome: 'fail'
			},
			{
				matcherValue: 'string',
				block: value.is.type('string'),
				input: {},
				inputLabel: '{}',
				outcome: 'fail'
			},
			{
				matcherValue: 'string',
				block: value.is.type('string'),
				input: [],
				inputLabel: '[]',
				outcome: 'fail'
			},
			{
				matcherValue: 'string',
				block: value.is.type('string'),
				input: EMPTY_STRING,
				outcome: 'pass'
			},
			{
				matcherValue: 'string',
				block: value.is.type('string'),
				input: '  ',
				inputLabel: `'  '`,
				outcome: 'pass'
			},
			{
				matcherValue: 'string',
				block: value.is.type('string'),
				input: ' ',
				inputLabel: `' '`,
				outcome: 'pass'
			},
			{
				matcherValue: 'string',
				block: value.is.type('string'),
				input: 'a',
				outcome: 'pass'
			},
			{
				matcherValue: 'string',
				block: value.is.type('string'),
				input: 'words words words',
				outcome: 'pass'
			},
			{
				matcherValue: 'string',
				block: value.is.type('string'),
				input: 'words words 14508714-0971497141-917194714',
				outcome: 'pass'
			},
			{
				matcherValue: 'string',
				block: value.is.type('string'),
				input: '4111',
				outcome: 'pass'
			},
			{
				matcherValue: 'string',
				block: value.is.type('string'),
				input: '-100',
				outcome: 'pass'
			},
			{
				matcherValue: 'string',
				block: value.is.type('string'),
				input: null,
				inputLabel: 'null',
				outcome: 'fail'
			},
			{
				matcherValue: 'string',
				block: value.is.type('string'),
				input: undefined,
				inputLabel: 'undefined',
				outcome: 'fail'
			},
			{
				matcherValue: 'undefined',
				block: value.is.type('undefined'),
				input: undefined,
				inputLabel: 'undefined',
				outcome: 'pass'
			},
			{
				matcherValue: `'null'`,
				block: value.is.type('null'),
				input: null,
				inputLabel: `null`,
				outcome: 'pass'
			},
			{
				matcherValue: `int`,
				block: value.is.type('int'),
				input: null,
				inputLabel: `null`,
				outcome: 'fail'
			},
			{
				matcherValue: `int`,
				block: value.is.type('int'),
				input: undefined,
				inputLabel: `undefined`,
				outcome: 'fail'
			},
			{
				matcherValue: `int`,
				block: value.is.type('int'),
				input: 0,
				outcome: 'pass'
			},
			{
				matcherValue: `int`,
				block: value.is.type('int'),
				input: -1,
				outcome: 'pass'
			},
			{
				matcherValue: `int`,
				block: value.is.type('int'),
				input: -1.1,
				outcome: 'fail'
			},
			{
				matcherValue: `int`,
				block: value.is.type('int'),
				input: 1.1,
				outcome: 'fail'
			},
			{
				matcherValue: `int`,
				block: value.is.type('int'),
				input: 1.0,
				outcome: 'pass'
			},
			{
				matcherValue: `int`,
				block: value.is.type('int'),
				input: -0,
				outcome: 'pass'
			},
			{
				matcherValue: `int`,
				block: value.is.type('int'),
				input: 0.0,
				outcome: 'pass'
			},
			{
				matcherValue: `int`,
				block: value.is.type('int'),
				input: -0.0,
				outcome: 'pass'
			},
			{
				matcherValue: `int`,
				block: value.is.type('int'),
				input: Number.MAX_SAFE_INTEGER,
				inputLabel: 'MAX_SAFE_INTEGER',
				outcome: 'pass'
			},
			{
				matcherValue: `int`,
				block: value.is.type('int'),
				input: Number.MIN_SAFE_INTEGER,
				inputLabel: 'MIN_SAFE_INTEGER',
				outcome: 'pass'
			},
			{
				matcherValue: `int`,
				block: value.is.type('int'),
				input: Number.NaN,
				inputLabel: 'NaN',
				outcome: 'fail'
			},
			{
				matcherValue: `int`,
				block: value.is.type('int'),
				input: Number.POSITIVE_INFINITY,
				inputLabel: 'POSITIVE_INFINITY',
				outcome: 'fail'
			},
			{
				matcherValue: `int`,
				block: value.is.type('int'),
				input: Number.NEGATIVE_INFINITY,
				inputLabel: 'NEGATIVE_INFINITY',
				outcome: 'fail'
			}
		]
	}
];

describe('Rulesets - isType', () => {
	matcherGroupTests(MATCHER_GROUPS);
});
