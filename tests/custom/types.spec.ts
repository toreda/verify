import {Levels, Log} from '@toreda/log';
import {CustomTypes} from '../../src/custom/types';
import {Schema} from '../../src';
import {SampleSchema} from '../_data/schema';

describe('CustomTypes', () => {
	let base: Log;
	beforeAll(() => {
		base = new Log({
			globalLevel: Levels.ALL,
			groupsStartEnabled: true,
			consoleEnabled: true
		});
	});

	describe('Constructor', () => {
		it(`should not throw when init.data is undefuned`, () => {
			expect(() => {
				const ctor = new CustomTypes({
					base: base
				});
			}).not.toThrow();
		});

		it(`should not throw when init.data is null`, () => {
			expect(() => {
				const ctor = new CustomTypes({
					base: base,
					data: null as any
				});
			}).not.toThrow();
		});

		it(`should register types provided by init.data`, () => {
			const schema = new SampleSchema(base);
			const custom = new CustomTypes({
				base: base,
				data: {
					bt4: schema
				}
			});

			expect(custom.has('bt4')).toBe(true);
		});

		it(`should register schema provided by init.data`, () => {
			const schema = new SampleSchema(base);
			const custom = new CustomTypes({
				base: base,
				data: {
					bt8: schema
				}
			});

			expect(custom.has('bt8')).toBe(true);
			const result = custom.getSchema('bt8');
			expect(result).not.toBeUndefined();
			expect(result).toBe(schema);
		});

		it(`should start with no custom types registered when customType init data is an empty object`, () => {
			const custom = new CustomTypes({
				base: base,
				data: {}
			});

			expect(custom.registered.size).toBe(0);
		});
	});

	describe('Implementation', () => {});
});
