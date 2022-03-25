import Defaults from '../../../src/defaults';
import {errorMkCode} from '../../../src/error/mk/code';

describe('errorMkCode', () => {
	it(`should append code with token onto entity when path arg is not provided`, () => {
		const entity = 'aaa97141';
		const code = '4441';
		const path = 'aaaa';

		const result = errorMkCode<string, string, string>(code, entity, path);
		expect(result).toBe(`${entity}${Defaults.ErrorCode.CodeToken}${code}`);
	});

	it(`should append code with token onto entity when path arg is not provided`, () => {
		const entity = 'vvv9714971';
		const code = '319713971';
		const path = ['aa', 'bb', 'cc'];

		//const result = errorMkCode<string, string, string>(code, entity, path);
		//expect(result).toBe(`${entity}${Defaults.ErrorCode.CodeToken}${code}`);
	});
});
