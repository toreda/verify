import {Levels, Log} from '@toreda/log';
import {Ruleset} from '../../src/ruleset';
import {SampleRulesetSchema, SampleSchema} from '../_data/schema';
import {Rule} from '../../src/rule';

const EMPTY_STRING = '';

describe('Schema Rulesets', () => {
	let instance: SampleSchema;
	let base: Log;
	let ruleset: Ruleset<any>;
	let value: Rule<any>;

	beforeAll(() => {
		ruleset = new Ruleset();
		value = ruleset.value();
		base = new Log({
			globalLevel: Levels.ALL,
			groupsStartEnabled: true,
			consoleEnabled: true
		});

		instance = new SampleRulesetSchema({
			base: base,
			name: 'SampleRulesetSchema',
			fields: [
				{
					name: 'fieldA',
					types: ['string']
				},
				{
					name: 'fieldB',
					types: 'string'
				}
			]
		});
	});

	beforeEach(() => {
		ruleset.reset();
		value.reset();
	});

	describe('Constructor', () => {
		it(`should initialize an empty ruleset for each field`, () => {
			const custom = new SampleRulesetSchema({
				base: base,
				name: 'SampleRulesetSchema',
				fields: [
					{
						name: 'fieldA',
						types: ['string']
					},
					{
						name: 'fieldB',
						types: 'string'
					}
				]
			});

			const fieldA = custom.fields.get('fieldA');
			const fieldB = custom.fields.get('fieldB');
			expect(fieldA).not.toBeUndefined();
			expect(fieldB).not.toBeUndefined();

			expect(fieldA?.ruleset.size()).toBe(0);
			expect(fieldB?.ruleset.size()).toBe(0);
		});

		it(`should set field rules provided in init`, () => {
			const custom = new SampleRulesetSchema({
				base: base,
				name: 'SampleRulesetSchema',
				fields: [
					{
						name: 'fieldA',
						types: ['string'],
						rules: [value.has.length.greaterThan(10), value.is.not.empty()]
					},
					{
						name: 'fieldB',
						types: 'string',
						rules: [value.is.empty()]
					}
				]
			});

			const fieldA = custom.fields.get('fieldA');
			const fieldB = custom.fields.get('fieldB');
			expect(fieldA).not.toBeUndefined();
			expect(fieldB).not.toBeUndefined();

			expect(fieldA?.ruleset.size()).toBe(1);
			expect(fieldB?.ruleset.size()).toBe(1);
		});

		it(`should pass ruleset validation when field value satisfies all rules`, async () => {
			const custom1 = new SampleRulesetSchema({
				base: base,
				name: 'SampleRulesetSchema',
				fields: [
					{
						name: 'fieldA',
						types: ['string'],
						rules: [value.has.length.greaterThan(10)]
					},
					{
						name: 'fieldB',
						types: ['string'],
						rules: [value.is.empty()]
					}
				]
			});

			const result = await custom1.verifyOnly({
				base: base,
				data: {
					fieldA: 'zd413834645989173',
					fieldB: ''
				}
			});

			expect(result.errorCode()).toBe(EMPTY_STRING);
			expect(result.ok()).toBe(true);
		});

		it(`should fail ruleset validation when field value doesn't satisfy a rule`, async () => {
			const custom2 = new SampleRulesetSchema({
				base: base,
				name: 'SampleRulesetSchema',
				fields: [
					{
						name: 'fieldA',
						types: ['string'],
						rules: [value.has.length.greaterThan(10)]
					},
					{
						name: 'fieldB',
						types: ['string'],
						rules: [value.is.empty()]
					}
				]
			});

			const fieldA = custom2.fields.get('fieldA');
			const fieldB = custom2.fields.get('fieldB');
			expect(fieldA).not.toBeUndefined();
			expect(fieldB).not.toBeUndefined();

			const result = await custom2.verifyOnly({
				base: base,
				data: {
					fieldA: 'aaaaaaaaaaaa',
					fieldB: 'aaaa'
				}
			});

			expect(result.errorCode()).toBe(`fail | [fieldB (aaaa) is empty]`);
			expect(result.ok()).toBe(false);
		});
	});

	describe('Implementation', () => {});
});
