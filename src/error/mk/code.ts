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

import type {ErrorCodeFlags} from '../code/flags';
import {errorCodePathDelimiter} from '../code/path/delimiter';
import {errorCodeToken} from '../code/token';

/**
 * Create error code with error path details.
 * @param			code
 * @param			root
 * @param			path
 * @param			opts
 *
 * @category Errors
 */
export function errorMkCode<CodeT extends string, RootT extends string, PathT = string | unknown>(
	code: CodeT,
	root: RootT,
	path?: PathT | PathT[],
	opts?: ErrorCodeFlags
): string {
	const codeToken = errorCodeToken(opts?.codeToken);
	const pathDelim = errorCodePathDelimiter(opts?.pathDelimiter);
	let base: string;

	if (Array.isArray(path)) {
		base = `${root}${pathDelim}${path.join(pathDelim)}`;
	} else if (typeof path === 'string') {
		base = `${root}${pathDelim}${path}`;
	} else {
		base = `${root}`;
	}

	return `${base}${codeToken}${code}`;
}
