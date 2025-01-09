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

import {type VerifierParams} from './params';
import {type Outcome} from '../outcome';
import {type VerifierSummary} from './summary';
import {stringValue} from '@toreda/strong-types';

/**
 *
 * @category Verifiers
 */
export interface VerifierResult {
	summary: VerifierSummary;
	name: string;
	results: VerifierResult[];
	outcome: Outcome;
	failedMatchers: string[];
}

/**
 * Creates VerifyResult and initialize with provided values, or default when
 * none provided.
 * @param params
 *
 * @category Verifiers
 */
export function verifierResult<InputT = unknown>(params?: Partial<VerifierParams<InputT>>): VerifierResult {
	return {
		name: stringValue(params?.name, '_default_'),
		results: [],
		outcome: 'fail',
		summary: {
			counts: {
				error: 0,
				errorPct: 0,
				fail: 0,
				failPct: 0,
				pass: 0,
				passPct: 0,
				skip: 0,
				skipPct: 0,
				total: 0,
				maxErrors: 0,
				maxFails: 0
			}
		},
		failedMatchers: []
	};
}
