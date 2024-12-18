import {PctLabelInit} from '../../../src/pct/label/init';
import {pctLabelRound, PctLabelRound} from '../../../src/pct/label/round';

describe('pctLabelRound', () => {
	let init: PctLabelRound;

	beforeEach(() => {
		init = {
			digits: 2,
			mode: 'none'
		};
	});

	describe('input validation', () => {
		it(`should return unmodified input value as string when init argument is undefined`, () => {
			const input = 1.881;
			const result = pctLabelRound(input, undefined as any);

			expect(result).toBe(input.toString());
		});

		it(`should return unmodified input value as string when init.mode is 'none'`, () => {
			const input = 1.999;
			init.mode = 'none';
			const result = pctLabelRound(input, init);

			expect(result).toBe(input.toString());
		});
	});

	describe('trunc', () => {
		it(`should truncate positive value without modifying 1.333 -> 1 with digits 0`, () => {
			init.mode = 'trunc';
			init.digits = 0;

			const result = pctLabelRound(1.333, init);
			expect(result).toBe('1');
		});

		it(`should truncate positive value without modifying 1.333 -> 1 with digits 1`, () => {
			init.mode = 'trunc';
			init.digits = 1;

			const result = pctLabelRound(1.333, init);
			expect(result).toBe('1.3');
		});

		it(`should truncate positive value without modifying 1.333 -> 1 with digits 2`, () => {
			init.mode = 'trunc';
			init.digits = 2;

			const result = pctLabelRound(1.33, init);

			expect(result).toBe('1.33');
		});

		it(`should truncate negative value < 0 without modifying 1.333 -> 1 with digits 2`, () => {
			init.mode = 'trunc';
			init.digits = 2;

			const result = pctLabelRound(1.33, init);

			expect(result).toBe('1.33');
		});
	});

	describe('ceil', () => {
		it(`should ceil positive value -0.001 -> 0.0 with digits 1`, () => {
			init.mode = 'ceil';
			init.digits = 1;
			const result = pctLabelRound(-0.00, init);
			expect(result).toBe('0.0');
		});

		it(`should ceil positive value -0.001 -> 0.00 with digits 2`, () => {
			init.mode = 'ceil';
			init.digits = 2;
			const result = pctLabelRound(-0.00, init);
			expect(result).toBe('0.00');
		});

		it(`should ceil positive value -0.001 -> 0.00 with digits 3`, () => {
			init.mode = 'ceil';
			init.digits = 3;
			const result = pctLabelRound(-0.00, init);
			expect(result).toBe('0.000');
		});

		it(`should ceil positive value 0.9999 -> 1 with digits 0`, () => {
			init.mode = 'ceil';
			init.digits = 0;
			const result = pctLabelRound(0.9999, init);
			expect(result).toBe('1');
		});

		it(`should ceil positive value 0.9999 -> 1.00 with digits 1`, () => {
			init.mode = 'ceil';
			init.digits = 1;
			const result = pctLabelRound(0.9999, init);
			expect(result).toBe('1.0');
		});

		it(`should ceil positive value 0.9999 -> 1.00 with digits 2`, () => {
			init.mode = 'ceil';
			init.digits = 2;
			const result = pctLabelRound(0.9999, init);
			expect(result).toBe('1.00');
		});

		it(`should ceil positive value 1.99 -> 2.00 with digits 2`, () => {
			init.mode = 'ceil';
			init.digits = 2;
			const result = pctLabelRound(1.99, init);
			expect(result).toBe('2.00');
		});

		it(`should ceil positive value 1.99 -> 2 with digits 0`, () => {
			init.mode = 'ceil';
			init.digits = 0;
			const result = pctLabelRound(1.99, init);

			expect(result).toBe('2');
		});

		it(`should ceil positive value > 1 and < 2 (1.99) -> 2.0 with digits 1`, () => {
			init.mode = 'ceil';
			init.digits = 1;
			const result = pctLabelRound(1.99, init);

			expect(result).toBe('2.0');
		});

		it(`should ceil positive value > 0 and < 1 (0.01) -> 1.0 with digits 1`, () => {
			init.mode = 'ceil';
			init.digits = 1;
			const result = pctLabelRound(0.01, init);

			expect(result).toBe('1.0');
		});

		it(`should ceil positive value > 0 and < 1 (0.01) -> 1 with digits 0`, () => {
			init.mode = 'ceil';
			init.digits = 0;
			const result = pctLabelRound(0.01, init);

			expect(result).toBe('1');
		});

		it(`should ceil negative value < 0 and > -1 (-0.01) -> 1 with digits 0`, () => {
			init.mode = 'ceil';
			init.digits = 0;
			const result = pctLabelRound(-0.01, init);

			expect(result).toBe('0');
		});

		it(`should ceil negative value -1 -> -1 with digits 0`, () => {
			init.mode = 'ceil';
			init.digits = 0;
			const result = pctLabelRound(-1, init);

			expect(result).toBe('-1');
		});
	});

	describe('floor', () => {
		it(`should floor positive value 0.001 -> 0.0 with digits 1`, () => {
			init.mode = 'floor';
			init.digits = 1;
			const result = pctLabelRound(0.001, init);

			expect(result).toBe('0.0');
		});

		it(`should floor positive value 0.001 -> 0.00 with digits 2`, () => {
			init.mode = 'floor';
			init.digits = 2;
			const result = pctLabelRound(0.001, init);

			expect(result).toBe('0.00');
		});

		it(`should floor positive value 0.001 -> 0.00 with digits 3`, () => {
			init.mode = 'floor';
			init.digits = 3;
			const result = pctLabelRound(0.001, init);

			expect(result).toBe('0.000');
		});

		it(`should floor positive value 0.9999 -> 0 with digits 0`, () => {
			init.mode = 'floor';
			init.digits = 0;
			const result = pctLabelRound(0.999, init);

			expect(result).toBe('0');
		});

		it(`should floor positive value 0.9999 -> 0.00 with digits 1`, () => {
			init.mode = 'floor';
			init.digits = 1;
			const result = pctLabelRound(0.999, init);

			expect(result).toBe('0.0');
		});

		it(`should floor positive value 0.9999 -> 0.00 with digits 2`, () => {
			init.mode = 'floor';
			init.digits = 2;
			const result = pctLabelRound(0.9999, init);
			expect(result).toBe('0.00');
		});

		it(`should floor positive value 1.99 -> 1.00 with digits 2`, () => {
			init.mode = 'floor';
			init.digits = 2;
			const result = pctLabelRound(1.99, init);
			expect(result).toBe('1.00');
		});

		it(`should floor positive value 1.99 -> 1 with digits 0`, () => {
			init.mode = 'floor';
			init.digits = 0;
			const result = pctLabelRound(1.99, init);
			expect(result).toBe('1');
		});

		it(`should floor positive value > 1 and < 2 (1.99) -> 1.0 with digits 1`, () => {
			init.mode = 'floor';
			init.digits = 1;
			const result = pctLabelRound(1.99, init);
			expect(result).toBe('1.0');
		});

		it(`should floor positive value > 0 and < 1 (0.01) -> 0.0 with digits 1`, () => {
			init.mode = 'floor';
			init.digits = 1;
			const result = pctLabelRound(0.01, init);
			expect(result).toBe('0.0');
		});

		it(`should floor positive value > 0 and < 1 (0.01) -> 0 with digits 0`, () => {
			init.mode = 'floor';
			init.digits = 0;
			const result = pctLabelRound(0.01, init);
			expect(result).toBe('0');
		});

		it(`should floor negative > -1 (-0.01) -> -1 with digits 0`, () => {
			init.mode = 'floor';
			init.digits = 0;
			const result = pctLabelRound(-0.01, init);
			expect(result).toBe('-1');
		});

		it(`should floor negative value -1 -> -1 with digits 0`, () => {
			init.mode = 'floor';
			init.digits = 0;
			const result = pctLabelRound(-1, init);

			expect(result).toBe('-1');
		});
	});

	describe('none', () => {
		it(`should return input when value is 4.444 & digits = 0`, () => {
			init.mode = 'none';
			const input = 4.444;
			const result = pctLabelRound(input, init);

			expect(result).toBe(input.toString());
		});

		it(`should return input when value is 0 & digits = 0`, () => {
			init.mode = 'none';
			const input = 0;
			const result = pctLabelRound(input, init);

			expect(result).toBe(input.toString());
		});
	});

	describe('round', () => {
		it(`should round 1 -> 1 with 0 digits`, () => {
			init.mode = 'round';
			init.digits = 0;
			const result = pctLabelRound(1, init);

			expect(result).toBe('1');
		});

		it(`should round 1 -> 1.0 with 1 digits`, () => {
			init.mode = 'round';
			init.digits = 1;
			const result = pctLabelRound(1, init);

			expect(result).toBe('1.0');
		});


		it(`should round 1 -> 1.00 with 1 digits`, () => {
			init.mode = 'round';
			init.digits = 2;
			const result = pctLabelRound(1, init);

			expect(result).toBe('1.00');
		});

		it(`should round 1.49 -> 1.00 with 2 digits`, () => {
			init.mode = 'round';
			init.digits = 2;
			const result = pctLabelRound(1.49, init);

			expect(result).toBe('1.00');
		});

		it(`should round 1.51 -> 2.00 with 2 digits`, () => {
			init.mode = 'round';
			init.digits = 2;
			const result = pctLabelRound(1.51, init);

			expect(result).toBe('2.00');
		});

		it(`should round 0 -> 0.0 with 1 digits`, () => {
			init.mode = 'round';
			init.digits = 1;
			const result = pctLabelRound(0, init);

			expect(result).toBe('0.0');
		});

		it(`should round 0.01 -> 0.0 with 1 digits`, () => {
			init.mode = 'round';
			init.digits = 1;
			const result = pctLabelRound(0.01, init);

			expect(result).toBe('0.0');
		});

		it(`should round -0.01 -> 0.0 with 1 digits`, () => {
			init.mode = 'round';
			init.digits = 1;
			const result = pctLabelRound(-0.01, init);

			expect(result).toBe('0.0');
		});

		it(`should round -1 -> -1.0 with 1 digits`, () => {
			init.mode = 'round';
			init.digits = 1;
			const result = pctLabelRound(-1, init);

			expect(result).toBe('-1.0');
		});

		it(`should round -1.49 -> -1.0 with 1 digits`, () => {
			init.mode = 'round';
			init.digits = 1;
			const result = pctLabelRound(-1.49, init);

			expect(result).toBe('-1.0');
		});

		it(`should round -1.51 -> -2.0 with 1 digits`, () => {
			init.mode = 'round';
			init.digits = 1;
			const result = pctLabelRound(-1.51, init);

			expect(result).toBe('-2.0');
		});
	});
});
