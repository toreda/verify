import {isUInt} from '../../src/is/uint';

interface TestCase {
	label?: string;
	value: unknown;

	result: boolean;
}

const TEST_CASES: TestCase[] = [
	{
		value: undefined,
		result: false
	},
	{
		value: null,
		result: false
	},
	{
		value: 1,
		result: true
	},
	{
		value: 0,
		result: true
	},
	{
		value: 0.001,
		result: false
	},
	{
		value: 1.001,
		result: false
	},
	{
		value: 1.0,
		result: true
	},
	{
		label: 'NaN',
		value: Number.NaN,
		result: false
	},
	{
		label: 'positive infinity',
		value: Number.POSITIVE_INFINITY,
		result: false
	},
	{
		label: 'negative infinity',
		value: Number.NEGATIVE_INFINITY,
		result: false
	},
	{
		label: 'epsilon',
		value: Number.EPSILON,
		result: false
	},
	{
		label: 'min safe int',
		value: Number.MIN_SAFE_INTEGER,
		result: false
	}
];

describe('isUInt', () => {
	for (const testCase of TEST_CASES) {
		const label = testCase.label ?? testCase.value;

		it(`should return ${testCase.result} when input is ${label}`, () => {
			const result = isUInt(testCase.value);

			expect(result).toBe(testCase.result);
		});
	}
});
