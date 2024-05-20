import {Levels, Log} from '@toreda/log';
import {Ruleset} from '../../src/ruleset';
import {SampleRulesetSchema, SampleSchema} from '../_data/schema';

describe('Schema Rulesets', () => {
	let instance: SampleSchema;
	let base: Log;

	beforeAll(() => {
		base = new Log({
			globalLevel: Levels.ALL,
			groupsStartEnabled: true,
			consoleEnabled: true
		});

		instance = new SampleRulesetSchema({
			base: base,
			name: 'SampleRulesetSchema',
			fields: []
		});
	});

	describe('Constructor', () => {
		it(`should initialize an empty ruleset for each field`, () => {

		});
	});

	describe('Implementation', () => {
		it(``, async () => {

		});
	});
});
