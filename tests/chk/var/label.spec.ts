import {verifierLabel} from '../../../src/verifier/label';
import Defaults from '../../../src/defaults';

const EMPTY_STRING = '';

describe('verifierLabel', () => {
	it(`should return the default value when label arg is undefined`, () => {
		const result = verifierLabel(undefined);

		expect(result).toBe(Defaults.Verifier.ValueLabel);
	});

	it(`should return the default value when label arg is null`, () => {
		const result = verifierLabel(null);

		expect(result).toBe(Defaults.Verifier.ValueLabel);
	});

	it(`should return the default value when label arg is null`, () => {
		const result = verifierLabel(null);

		expect(result).toBe(Defaults.Verifier.ValueLabel);
	});

	it(`should return the default value when label arg is an empty string`, () => {
		const result = verifierLabel(EMPTY_STRING as any);

		expect(result).toBe(Defaults.Verifier.ValueLabel);
	});

	it(`should return 'value' when label arg is 'value'`, () => {
		const result = verifierLabel('value');

		expect(result).toBe('value');
	});

	it(`should return 'arg' when label arg is 'arg'`, () => {
		const result = verifierLabel('arg');

		expect(result).toBe('arg');
	});

	it(`should return default value when label arg is not a valid Var Label value`, () => {
		const result = verifierLabel('somethingelse' as any);

		expect(result).toBe(Defaults.Verifier.ValueLabel);
	});
});
