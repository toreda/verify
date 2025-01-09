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

import {type VerifierLabel} from './label';

/**
 * (optional) Flags that turn verifier behaviors on/off.
 *
 * @category Verifiers
 */
export interface VerifierFlags {
	/**
	 * Max number of internal fails before verifier aborts and returns fail status.
	 * The default is typically 0, but each verifier implements its own limits.
	 * @default 0
	 */
	maxFails?: number;
	/**
	 * Max number of errors before verifier aborts and returns error status.
	 * The default is typically 0, but each verifier implements its own limits.
	 * @default 0
	 * @example
	 * ```ts
	 * const flags verifierMkFlags({
	 * maxErrors: 1
	 * });
	 * ```
	 */
	maxErrors?: number;
	/**
	 * Length properties. Only used when relevant to verifier.
	 */
	length?: {
		min?: number;
		max?: number;
	};
	/**
	 * Do not trim the string value before validation. String values are automatically trimmed
	 * prior to validation unless this flag is true. Trimming values which have already been
	 * Default: true
	 */
	notrim?: boolean;
	error?: {
		root?: string;
		pathPrepend?: string[];
		pathAppend?: string[];
	};
	/**
	 * Extra flags to allow patterns which are otherwise disallowed by default.
	 */
	allow?: {
		/**
		 * Allow empty string values. Empty strings and strings that trim down to empty strings
		 * fail validation when set to `false`.
		 * Default: false
		 */
		empty?: boolean;
		null?: boolean;
	};
	valueLabel?: VerifierLabel | string;
}
