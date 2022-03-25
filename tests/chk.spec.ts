import {Chk} from '../src/chk/num';
import {ChkValue} from '../src/chk/value';
import {chkMk} from '../src/chk/mk';

const ROOT_CONSTRAINTS: string[] = ['is', 'be', 'have', 'match'];

describe('chk', () => {
	let instance: Chk<string>
	let strResult: ChkValue<string>;
	let intResult: ChkValue<number>;

	beforeAll(() => {
		strResult = chkMk('aaaaaa');
	});

	it(`should return a new object each call`, () => {
		const chk1 = chkMk('a');
		const result2 = chkMk('b');

		chk1.must.be.greaterThan(311).and.have.length.greaterThan();

		expect(chk1).not.toBe(result2);
	});

	describe('Root Constraints', () => {
		const root = chk<string>('aaaaaa');

		for (const constraint of ROOT_CONSTRAINTS) {
			it(`should define constraint '${constraint}'`, () => {
				expect(root).toHaveProperty(constraint);
			});
		}
	});
});
