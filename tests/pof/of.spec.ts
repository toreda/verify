import NUMBERS_MISSING from '../_data/numbers/missing';
import {powOf} from '../../src/pow/of';

describe('powOf', () => {

	for (const missing of NUMBERS_MISSING) {
		it(`should return false when missing value arg is undefined`, () => {
			expect(powOf(undefined as any, 1)).toBe(false);
		});
	}
});
