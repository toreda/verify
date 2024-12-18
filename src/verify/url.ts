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

import type {VerifierFlags} from '../verifier/flags';
import {Codes} from '../codes';
import {Fate} from '@toreda/fate';

/**
 * Verify Value is Url
 *
 * @param			value
 *
 * @category		Verify Functions
 */
export function verifyUrl(value?: unknown, flags?: VerifierFlags): Fate<string> {
	const fate = new Fate<string>();

	const maxLen = typeof flags?.length?.max === 'number' ? flags?.length?.max : 100;
	const minLen = typeof flags?.length?.min === 'number' ? flags?.length?.min : 1;

	if (value === undefined || value === null) {
		return fate.setErrorCode(Codes.missing());
	}

	if (typeof value !== 'string') {
		return fate.setErrorCode(Codes.badFormat());
	}

	if (value.length > maxLen) {
		return fate.setErrorCode(Codes.tooLong());
	}

	if (value.length < minLen) {
		return fate.setErrorCode(Codes.tooShort());
	}

	fate.data = value;
	return fate.setSuccess(true);
}
