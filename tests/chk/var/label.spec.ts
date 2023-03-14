import {ChkVarLabel} from '../../../src/chk/var/label';
import Defaults from '../../../src/defaults';
import {chkVarLabel} from '../../../src/chk/var/label';

const EMPTY_STRING = '';

describe('chkVarLabel', () => {
	it(`should return the default value when label arg is undefined`, () => {
		const result = chkVarLabel(undefined);

		expect(result).toBe(Defaults.Chk.VarLabel);
	});

	it(`should return the default value when label arg is null`, () => {
		const result = chkVarLabel(null);

		expect(result).toBe(Defaults.Chk.VarLabel);
	});

	it(`should return the default value when label arg is null`, () => {
		const result = chkVarLabel(null);

		expect(result).toBe(Defaults.Chk.VarLabel);
	});

	it(`should return the default value when label arg is an empty string`, () => {
		const result = chkVarLabel(EMPTY_STRING as any);

		expect(result).toBe(Defaults.Chk.VarLabel);
	});

	it(`should return 'value' when label arg is 'value'`, () => {
		const result = chkVarLabel('value');

		expect(result).toBe('value');
	});

	it(`should return 'arg' when label arg is 'arg'`, () => {
		const result = chkVarLabel('arg');

		expect(result).toBe('arg');
	});

	it(`should return default value when label arg is not a valid Var Label value`, () => {
		const result = chkVarLabel('somethingelse' as any);

		expect(result).toBe(Defaults.Chk.VarLabel);
	});
});
