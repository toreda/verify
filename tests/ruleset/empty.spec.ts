import {Ruleset} from '../../src/ruleset';
import {MatcherGroup} from '../_util/matchers';
import {matcherGroupTests} from '../_util/matchers';

const EMPTY_STRING = '';

const ruleset = new Ruleset<string>();
const value = ruleset.value();

const MATCHER_GROUPS: MatcherGroup[] = [
	{
		opName: '∅',
		fn: 'empty',
		cases: [
			{
				block: value.is.empty(),
				input: ['one'],
				inputLabel: `['one']`,
				outcome: 'fail'
			},
			{
				block: value.is.not.empty(),
				input: ['one'],
				inputLabel: `['one']`,
				outcome: 'pass'
			},
			{
				block: value.is.empty(),
				input: [],
				inputLabel: '[]',
				outcome: 'pass'
			},
			{
				block: value.is.not.empty(),
				input: [],
				inputLabel: '[]',
				outcome: 'fail'
			},
			{
				block: value.is.empty(),
				input: [1, 1, 3],
				inputLabel: '[1, 1, 3]',
				outcome: 'fail'
			},
			{
				block: value.is.not.empty(),
				input: [2, 3, 4],
				inputLabel: '[2, 3, 4]',
				outcome: 'pass'
			},
			{
				block: value.is.empty(),
				input: EMPTY_STRING,
				inputLabel: `EMPTY_STRING`,
				outcome: 'pass'
			},
			{
				block: value.is.not.empty(),
				input: EMPTY_STRING,
				inputLabel: `EMPTY_STRING`,
				outcome: 'fail'
			},
			{
				block: value.is.empty(),
				input: 'word',
				inputLabel: `'word'`,
				outcome: 'fail'
			},
			{
				block: value.is.empty(),
				input: false,
				inputLabel: `false`,
				outcome: 'fail'
			},
			{
				block: value.is.not.empty(),
				input: false,
				inputLabel: `false`,
				outcome: 'pass'
			},
			{
				block: value.is.empty(),
				input: true,
				inputLabel: `true`,
				outcome: 'fail'
			},
			{
				block: value.is.empty(),
				input: 0,
				inputLabel: `0`,
				outcome: 'fail'
			},
			{
				block: value.is.not.empty(),
				input: 0,
				inputLabel: `0`,
				outcome: 'pass'
			},
			{
				block: value.is.empty(),
				input: 1,
				inputLabel: `1`,
				outcome: 'fail'
			},
			{
				block: value.is.not.empty(),
				input: 1,
				inputLabel: `1`,
				outcome: 'pass'
			},
			{
				block: value.is.empty(),
				input: {},
				inputLabel: `{}`,
				outcome: 'pass'
			},
			{
				block: value.is.not.empty(),
				input: {},
				inputLabel: '{}',
				outcome: 'fail'
			}
		]
	}
];

describe('Rulesets - empty', () => {
	matcherGroupTests(MATCHER_GROUPS);
});
