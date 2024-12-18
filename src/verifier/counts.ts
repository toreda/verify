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

/**
 * Summary counts for each sub-verification.
 *
 * @category Verifier
 */
export interface VerifierCounts {
	/**
	 * Verification Errors
	 *
	 * 'error' outcomes are returned when execution interrupted or did not
	 * start due to an exception or serious error.
	 */
	error: number;
	/**
	 * Error Percentage
	 *
	 * Percentage (as decimal) of total matchers that returned error.
	 */
	errorPct: number;
	/**
	 * Verifications Failures
	 *
	 * `fail` outcomes occur when a provided value fails validation in
	 * one more matchers.
	 */
	fail: number;
	/**
	 * Fail Percentage
	 *
	 * Percentage (as decimal) of total matchers that returned fail.
	 */
	failPct: number;
	/**
	 * Verification Passed
	 *
	 * Value passed validation by all matchers.
	 */
	pass: number;
	/**
	 * Pass Percentage
	 *
	 * Percentage (as decimal) of total matchers that returned pass.
	 */
	passPct: number;
	/**
	 * Verifications Skipped
	 *
	 * How many matchers opted out of validation due to rules, threshold, or
	 * other criteria. Skipped validator executions never run, so don't count as
	 * or add to `pass` or `fail` counts.
	 */
	skip: number;
	/**
	 * Skip Percentage
	 *
	 * Percentage (as decimal) of total matchers that returned skip.
	 */
	skipPct: number;
	/**
	 * Total Count
	 *
	 * Sum of attempted verification executions that ended in any status.
	 */
	total: number;
	maxErrors: number;
	maxFails: number;
}
