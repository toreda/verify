/**
 *	MIT License
 *
 *	Copyright (c) 2019 - 2025 Toreda, Inc.
 *
 *	Permission is hereby granted, free of charge, to any person obtaining a copy
 *	of this software and associated documentation files (the "Software"), to deal
 *	in the Software without restriction, including without limitation the rights
 *	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *	copies of the Software, and to permit persons to whom the Software is
 *	furnished to do so, subject to the following conditions:

 * 	The above copyright notice and this permission notice shall be included in all
 * 	copies or substantial portions of the Software.
 *
 * 	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * 	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * 	SOFTWARE.
 *
 */

import {isNumberFinite} from './is/number/finite';

/**
 * Determine if `value` is strictly greater than `left` AND less than `right`.
 * @param			left
 * @param			value
 * @param			right
 *
 * @category Matcher Predicate Functions
 *
 * @example Value is in range
 * ```typescript
 * const a = 10;
 * const b = 20;
 * const value = 15;
 * // Result is true, - value is more than a and less than b.
 * const result = await between<number>(a, value, b);
 * ```
 * @example Value is not in range
 * ```typescript
 * const a = 0;
 * const b = 10;
 * const value = 20;
 * // Result is false - value is more than b.
 * const result = await between<number>(a, value, b);
 * ```
 * @example Value is not a number
 * ```typescript
 * const a = 0;
 * const b = 10;
 * const value = 'aaaa';
 * // Result is false - value fails the finite number check.
 * const result = await between<number>(a, value, b);
 * ```
 */
export async function between<ValueT>(left: number, value: ValueT, right: number): Promise<boolean> {
	if (!isNumberFinite(left) || !isNumberFinite(value) || !isNumberFinite(right)) {
		return false;
	}

	return value > left && value < right;
}
