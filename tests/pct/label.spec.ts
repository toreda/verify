import {pctLabel} from '../../src/pct/label';

const EMPTY_STRING = '';
describe('pctLabel', () => {
	describe('Default Formatting', () => {
		it(`should return '0%' when no formatting options are used with number 0`, () => {
			const result = pctLabel({
				value: 0
			});

			expect(result).toBe('0%');
		});

		it(`should return '0%' when no formatting options are used with number '0'`, () => {
			const result = pctLabel({
				value: '0'
			});

			expect(result).toBe('0%');
		});

		it(`should return '' when init argument is undefined`, () => {
			const result = pctLabel(undefined as any);

			expect(result).toBe(EMPTY_STRING);
		});

		it(`should return '' when init argument is null`, () => {
			const result = pctLabel(null as any);

			expect(result).toBe(EMPTY_STRING);
		});

		it(`should return '' when init.value is null and fallback is undefined`, () => {
			const result = pctLabel({
				value: null as any,
				fallbackValue: undefined
			});

			expect(result).toBe(EMPTY_STRING);
		});

		it(`should return '' when init.value is undefined and fallback is undefined`, () => {
			const result = pctLabel({
				value: undefined as any,
				fallbackValue: undefined
			});

			expect(result).toBe(EMPTY_STRING);
		});

		it(`should return fallback when init.value is undefined`, () => {
			const fallback = '141';
			const result = pctLabel({
				value: undefined as any,
				fallbackValue: fallback
			});

			expect(result).toBe(fallback);
		});

		it(`should return fallback when init.value is null`, () => {
			const fallback = '3312';
			const result = pctLabel({
				value: null as any,
				fallbackValue: fallback
			});

			expect(result).toBe(fallback);
		});

		it(`should return fallback when init.value is null`, () => {
			const fallback = '141';
			const result = pctLabel({
				value: null as any,
				fallbackValue: fallback
			});

			expect(result).toBe(fallback);
		});
	});

	describe('Custom Formatting', () => {
		it(`should append 'appendText' to value, but not %`, () => {
			const start = 14;
			const end = '-97149714736357';
			const result = pctLabel({
				appendText: end,
				value: start
			});

			expect(result.endsWith(end)).toBe(true);
			expect(result.startsWith(start.toString())).toBe(true);
		});

		it(`should append 'appendText' to value when its an empty string, but not %`, () => {
			const start = 91991;

			const end = '';
			const result = pctLabel({
				appendText: end,
				value: start,
				multiplier: 1
			});

			expect(result).toBe(start.toString());
		});

		it(`should append nothing when appendPctSign is false and appendText is null`, () => {
			const start = 91991;

			const end = '';
			const result = pctLabel({
				appendText: null,
				appendPctSign: false,
				value: start,
				multiplier: 1
			});

			expect(result).toBe(start.toString());
		});

		it(`should append nothing when appendPctSign is false and appendText is undefined`, () => {
			const start = 91991;

			const end = '';
			const result = pctLabel({
				appendText: undefined,
				appendPctSign: false,
				value: start,
				multiplier: 1
			});

			expect(result).toBe(start.toString());
		});

		it(`should prepend text and append pct sign when prependText is a string`, () => {
			const prefix = 'aaa74-';
			const value = 1;
			const result = pctLabel({
				prependText: prefix,
				multiplier: 1,
				value: value
			});

			expect(result.startsWith(prefix)).toBe(true);
			expect(result.endsWith('%')).toBe(true);
		});
	});

	describe('Multiplier', () => {
		it(`should output 0% when multiplier is 0`, () => {
			const value = 1;
			const result = pctLabel({
				multiplier: 0,
				value: value
			});

			expect(result).toBe('0%');
		});

		it(`should output 10% when multiplier is 1`, () => {
			const value = 10;
			const result = pctLabel({
				multiplier: 1,
				value: value
			});

			expect(result).toBe('10%');
		});
	});
});
