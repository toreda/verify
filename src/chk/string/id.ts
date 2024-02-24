/**
 *	MIT License
 *
 *	Copyright (c) 2019 - 2023 Toreda, Inc.
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
import {Codes} from '../../codes';
import {Fate} from '@toreda/fate';
import {chkVarLabel} from '../var/label';
import {errorMkCode} from '../../error/mk/code';

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
export function chkStringId(id: string, value: unknown, flags?: ChkFlags): Fate<string> {
	const fate = new Fate<string>();

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
	const label = chkVarLabel(flags?.varLabel);

	if (id === null || id === undefined) {
		return fate.setErrorCode(
			errorMkCode(Codes.missingArg(), 'id', [...pathPrepend, 'arg', ...pathAppend])
		);
	}

	if (typeof id !== 'string') {
		return fate.setErrorCode(
			errorMkCode(Codes.badArgFormat(), 'id', [...pathPrepend, 'arg', ...pathAppend])
		);
	}

	if (value === undefined) {
		return fate.setErrorCode(
			errorMkCode(Codes.missingArg(), errorRoot, [...pathPrepend, label, ...pathAppend])
		);
	}


	// Must do null check BEFORE the not a string check, otherwise the null check condition
	// will not be executed.
	if (value === null && flags?.allow?.null === true) {
		fate.data = null;
		return fate.setSuccess(true);
	}

	if (typeof value !== 'string') {
		return fate.setErrorCode(
			errorMkCode(Codes.badFormat(), errorRoot, [...pathPrepend, label, ...pathAppend])
		);
	}

	const trimmed = flags?.notrim !== true ? value.trim() : value;

	if (!trimmed) {
		if (flags?.allow?.empty !== true) {
			return fate.setErrorCode(errorMkCode('empty', errorRoot, [...pathPrepend, label, ...pathAppend]));
		}
	}

	if (flags?.length) {
		if (typeof flags.length.max === 'number' && trimmed.length > flags.length.max) {
			return fate.setErrorCode(
				errorMkCode('too_long', errorRoot, [...pathPrepend, label, ...pathAppend])
			);
		}

		if (typeof flags.length.min === 'number' && trimmed.length < flags.length.min) {
			return fate.setErrorCode(
				errorMkCode('too_short', errorRoot, [...pathPrepend, label, ...pathAppend])
			);
		}
	}

	fate.data = value;
	return fate.setSuccess(true);
}
