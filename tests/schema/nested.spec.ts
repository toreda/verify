import {Levels, Log} from '@toreda/log';
import {NestedRootSchema} from '../_data/nested';

describe('Schema Nested', () => {
	let base: Log;

	beforeAll(async () => {
		base = new Log({
			groupsStartEnabled: true,
			globalLevel: Levels.ALL,
			consoleEnabled: true
		});
	});

	describe('Constructor', () => {
		it(`should create Nested root`, () => {
			expect(() => {
				const _instance = new NestedRootSchema(base);
			}).not.toThrow();
		});
	});
});
