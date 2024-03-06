import {Ruleset} from '../src/ruleset';
import {type RulesetInit} from '../src/ruleset/init';
import {Value} from '../src/value';

const STMT_METHODS = [
	{
		name: 'must'
	},
	{
		name: 'contains'
	},
	{
		name: 'is'
	},
	{
		name: 'has'
	},
	{
		name: 'matches'
	}
];

describe('Ruleset', () => {
	let init: RulesetInit<string>;
	let instance: Ruleset<string>;
	let value: Value<string>;

	beforeAll(() => {
		value = new Value<string>();
		instance = new Ruleset<string>({
			value: value
		});
	});

	beforeEach(() => {
		value.reset();
		init = {
			value: value
		};
		instance.reset();
	});

	describe('Constructor', () => {});

	describe('Implementation', () => {
		for (const method of STMT_METHODS) {
			it(`should define block function '${method.name}'`, async () => {
				expect(instance).toHaveProperty(method.name);
			});
		}
	});
});
