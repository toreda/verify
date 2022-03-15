import Defaults from '../../../src/defaults';
import {errorCodeToken} from '../../../src/error/code/token';

const EMPTY_STRING = '';

describe('errorCodeToken', () => {
	it('should return global Default CodeToken when value arg is undefined', () => {
		expect(errorCodeToken()).toBe(Defaults.ErrorCode.CodeToken);
	});

	it('should return global Default CodeToken when value arg is null', () => {
		expect(errorCodeToken(null)).toBe(Defaults.ErrorCode.CodeToken);
	});

	it('should return global Default CodeToken when value arg is an empty string', () => {
		expect(errorCodeToken(EMPTY_STRING)).toBe(Defaults.ErrorCode.CodeToken);
	});

	it('should return global Default CodeToken when value arg is an empty string', () => {
		expect(errorCodeToken(EMPTY_STRING)).toBe(Defaults.ErrorCode.CodeToken);
	});

	it(`should return value as code token when value is a valid string`, () => {
		const value = '!_';
		expect(errorCodeToken(value)).toBe(value);
	});
});
