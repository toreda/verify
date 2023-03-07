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

import type {ChkFlags} from '../flags';
import {Fate} from '@toreda/fate';

/**
 * Check if value is a valid id string according to the optional validation rules when provided.
 * Uses default rules when not provided.
 * @param id
 * @param value
 * @param rules
 * @returns
 *
 * @category Chk
 */
export function chkStringId<T>(id: string, value: string, flags?: ChkFlags): Fate<T> {
	const fate = new Fate<T>();

	if (typeof id !== 'string') {
		return fate.setErrorCode('no_id');
	}

	if (value === undefined) {
		return fate.setErrorCode(`${id}:missing`);
	}

	if (typeof value !== 'string') {
		return fate.setErrorCode(`${id}:bad_format`);
	}

	const trimmed = flags?.notrim !== true ? value.trim() : value;

	if (!trimmed) {
		if (flags?.allow && flags.allow.empty !== true) {
			return fate.setErrorCode(`${id}:empty`);
		}
	}

	if (flags?.length) {
		if (typeof flags.length.max === 'number' && trimmed.length > flags.length.max) {
			return fate.setErrorCode(`${id}:too_long`);
		}

		if (typeof flags.length.min === 'number' && trimmed.length < flags.length.min) {
			return fate.setErrorCode(`${id}:too_short`);
		}
	}

	return fate;
}
