import Defaults from '../../../../src/defaults';
import {errorCodePathDelimiter} from '../../../../src/error/code/path/delimiter';

const EMPTY_STRING = '';

describe('errorCodePathDelimiter', () => {
	it('should return global Default PathDelimiter when value arg is undefined', () => {
		expect(errorCodePathDelimiter()).toBe(Defaults.ErrorCode.PathDelimiter);
	});

	it('should return global Default PathDelimiter when value arg is null', () => {
		expect(errorCodePathDelimiter(null)).toBe(Defaults.ErrorCode.PathDelimiter);
	});

	it('should return global Default PathDelimiter when value arg is an empty string', () => {
		expect(errorCodePathDelimiter(EMPTY_STRING)).toBe(Defaults.ErrorCode.PathDelimiter);
	});

	it('should return global Default PathDelimiter when value arg is an empty string', () => {
		expect(errorCodePathDelimiter(EMPTY_STRING)).toBe(Defaults.ErrorCode.PathDelimiter);
	});

	it(`should return value as code token when value is a valid string`, () => {
		const value = '---';
		expect(errorCodePathDelimiter(value)).toBe(value);
	});
});
