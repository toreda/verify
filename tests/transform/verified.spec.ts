import {Primitive} from '@toreda/types';
import {transformVerified} from '../../src/transform/verified';
import {schemaError} from '../../src';
import {Levels, Log} from '@toreda/log';

describe('transformVerified', () => {
	let verifiedMap: Map<string, string>;
	let base: Log;

	beforeAll(() => {
		verifiedMap = new Map<string, string>();
		base = new Log({
			consoleEnabled: true,
			globalLevel: Levels.ALL,
			groupsStartEnabled: true
		});
	});

	beforeEach(() => {
		verifiedMap.clear();
	});

	describe('Base parameters', () => {
		it(`should fail with code when base arg is undefined`, async () => {
			const result = await transformVerified<Primitive, any>(verifiedMap, undefined as any);
			expect(result.ok()).toBe(false);

			expect(result.errorCode()).toBe(schemaError('missing_argument', 'transformVerified', 'base'));
		});

		it(`should fail with code when base arg is null`, async () => {
			const result = await transformVerified<Primitive, any>(verifiedMap, null as any);
			expect(result.ok()).toBe(false);

			expect(result.errorCode()).toBe(schemaError('missing_argument', 'transformVerified', 'base'));
		});

		it(`should succeed when input is an empty map`, async () => {
			expect(verifiedMap.size).toBe(0);

			const result = await transformVerified<Primitive, any>(verifiedMap, base);
			expect(result.ok()).toBe(true);
			expect(result.data).toStrictEqual({});
		});
	});
});
