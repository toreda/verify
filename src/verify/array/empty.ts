/**
 *	MIT License
 *
 *	Copyright (c) 2019 - 2024 Toreda, Inc.
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

import {Fate} from '@toreda/fate';
import {isArray} from '../../is/array';

/**
 * Determine whether value is an array and if so, whether it's empty.
 * @param value		Value to be verified as an empty array.
 *
 * @category		Verify Function
 */
export function verifyArrayEmpty<ValueT>(value: unknown | unknown[]): Fate<ValueT[]> {
	const fate = new Fate<ValueT[]>();

	if (value === undefined || value === null) {
		return fate.setErrorCode('missing');
	}

	if (!isArray(value)) {
		return fate.setErrorCode('bad_format');
	}

	const arr = value as ValueT[];
	if (arr.length > 0) {
		return fate.setErrorCode('not_empty');
	}

	fate.data = arr;
	return fate.setSuccess(true);
}
