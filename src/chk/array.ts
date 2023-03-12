/**
 *	MIT License
 *
 *	Copyright (c) 2023 Toreda, Inc.
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

import type {ChkFlags} from './flags';
import {Fate} from '@toreda/fate';

/**
 *
 * @param value
 * @param flags
 * @returns
 *
 * @category Stand-alone Validators
 */
export function chkArray(value?: unknown[] | null, flags?: ChkFlags): Fate<never> {
	const fate = new Fate<never>();

	if (value === undefined || value === null) {
		return fate.setErrorCode('missing');
	}

	if (!Array.isArray(value)) {
		return fate.setErrorCode('bad_format');
	}

	const empty = value.length === 0;

	// Empty arrays are valid by default unless flags.allow.empty is explicitly true.
	if (empty && flags?.allow?.empty === false) {
		return fate.setErrorCode('empty');
	}

	return fate.setSuccess(true);
}
