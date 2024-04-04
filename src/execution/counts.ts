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

/**
 * Execution result counts.
 *
 * @category Executor
 */
export interface ExecutionCounts {
	/**
	 * @description 'error' outcomes are returned when execution interrupted or did not
	 * start due to an exception or serious error.
	 */
	error: number;
	/**
	 * @description `fail` outcomes occur when a provided value fails validation in
	 * one more matchers.
	 */
	fail: number;
	/**
	 * @description Provided value passed validation in all matchers.
	 */
	pass: number;
	/**
	 * @description `skip` occurs when all available matchers skip execution due to
	 * reaching rule criteria such as reaching a threshold, time limit, or some
	 * exclusive "this test or this test but not both" situations. `skip` is not an
	 * implied `pass` or `fail`, just an indication that matchers opted out.
	 */
	skip: number;
	/**
	 * @description Total number of all outcomes during execution.
	 */
	total: number;
}
