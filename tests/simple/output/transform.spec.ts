import {Levels, Log} from '@toreda/log';
import {transformVerified} from '../../../src/transform/verified';
import {schemaError} from '../../../src';

const EMPTY_OBJECT = {};
const EMPTY_STRING = '';

describe('transformVerified', () => {
	let base: Log;
	let input: Map<string, any>;

	beforeAll(() => {
		input = new Map<string, any>();
		base = new Log({
			consoleEnabled: true,
			globalLevel: Levels.ALL,
			groupsStartEnabled: true
		});
	});

	beforeEach(() => {
		input.clear();
	});

	describe('Input Validation', () => {
		it(`should fail with code when input arg is undefined`, async () => {
			const result = await transformVerified(undefined as any, base);

			expect(result.ok()).toBe(false);
			expect(result.errorCode()).toBe(schemaError('missing_argument', 'transformVerified', 'input'));
		});

		it(`should fail with code when input arg is null`, async () => {
			const result = await transformVerified(null as any, base);

			expect(result.ok()).toBe(false);
			expect(result.errorCode()).toBe(schemaError('missing_argument', 'transformVerified', 'input'));
		});

		it(`should fail with code when base arg is undefined`, async () => {
			const result = await transformVerified(input, undefined as any);

			expect(result.ok()).toBe(false);
			expect(result.errorCode()).toBe(schemaError('missing_argument', 'transformVerified', 'base'));
		});

		it(`should fail with code when base arg is null`, async () => {
			const result = await transformVerified(input, null as any);

			expect(result.ok()).toBe(false);
			expect(result.errorCode()).toBe(schemaError('missing_argument', 'transformVerified', 'base'));
		});
	});

	describe('Output Transformation', () => {
		it(`should return an empty object when input map is empty`, async () => {
			expect(input.size).toBe(0);
			const result = await transformVerified(input, base);

			expect(result.errorCode()).toBe(EMPTY_STRING);
			expect(result.ok()).toBe(true);
			expect(result.data).toEqual(EMPTY_OBJECT);
		});

		it(`should transform map into an object`, async () => {
			const a = 'ff331971';
			const b = 'f9881763';
			const c = ['ca084811', 'g4890000'];
			const d = {
				ab3: 'string97149714',
				ab4: 'string32321111'
			};

			input.set('a', a);
			input.set('b', b);
			input.set('c', c);
			input.set('d', d);

			const result = await transformVerified(input, base);
			expect(result.errorCode()).toBe(EMPTY_STRING);
			expect(result.ok()).toBe(true);
			expect(result.data).toEqual({
				a: a,
				b: b,
				c: c,
				d: d
			});
		});
	});
});
