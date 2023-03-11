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
import {errorMkCode} from 'src/error/mk/code';

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

	let pathAppend: string[] = [];
	let pathPrepend: string[] = [];

	// Use of conditional plus Array checks rather than ternary statements with assignment due to
	// TypeScript incorrectly flagging the array values as possibly undefined.
	if (flags && flags.error) {
		if (Array.isArray(flags.error.pathPrepend)) {
			pathPrepend = [...flags.error.pathPrepend];
		}

		if (Array.isArray(flags.error.pathAppend)) {
			pathAppend = [...flags.error.pathAppend];
		}
	}

	const errorRoot = typeof flags?.error?.root === 'string' ? flags?.error?.root : id;

	if (id === null || id === undefined) {
		return fate.setErrorCode(errorMkCode('missing_arg', 'id', [...pathPrepend, 'arg', ...pathAppend]));
	}

	if (typeof id !== 'string') {
		return fate.setErrorCode(errorMkCode('bad_arg_format', 'id', [...pathPrepend, 'arg', ...pathAppend]));
	}

	if (value === undefined) {
		return fate.setErrorCode(
			errorMkCode('missing_arg', errorRoot, [...pathPrepend, 'value', 'arg', ...pathAppend])
		);
	}

	if (value === null && flags?.allow?.null === true) {
		return fate.setSuccess(true);
	}

	if (typeof value !== 'string') {
		return fate.setErrorCode(
			errorMkCode('bad_format', errorRoot, [...pathPrepend, 'value', ...pathAppend])
		);
	}

	const trimmed = flags?.notrim !== true ? value.trim() : value;

	if (!trimmed) {
		if (flags?.allow?.empty !== true) {
			return fate.setErrorCode(
				errorMkCode('empty', errorRoot, [...pathPrepend, 'value', ...pathAppend])
			);
		}
	}

	if (flags?.length) {
		if (typeof flags.length.max === 'number' && trimmed.length > flags.length.max) {
			return fate.setErrorCode(
				errorMkCode('too_long', errorRoot, [...pathPrepend, 'value', ...pathAppend])
			);
		}

		if (typeof flags.length.min === 'number' && trimmed.length < flags.length.min) {
			return fate.setErrorCode(
				errorMkCode('too_short', errorRoot, [...pathPrepend, 'value', ...pathAppend])
			);
		}
	}

	return fate.setSuccess(true);
}
