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
 * Determine if left and right are strictly equal without type coercion.
 * @param left
 * @param right
 *
 * @category Matcher Predicates
 */
export function equalTo(left: unknown, right: unknown): boolean {
	if (left === null && right === null) {
		return true;
	}

	if (Number.isNaN(left) && Number.isNaN(right)) {
		return true;
	}

	if (typeof left !== typeof right) {
		return false;
	}

	if (Array.isArray(left) && Array.isArray(right)) {
		if (left.length === 0 && right.length === 0) {
			return true;
		}

		if (left.length !== right.length) {
			return false;
		}

		for (let i = 0; i < left.length - 1; i++) {
			if (left[i] !== right[i]) {
				return false;
			}
		}

		return true;
	}

	const type = typeof left;

	switch (type) {
		case 'string':
			return left === right;
		case 'number':
			return left === right;
		case 'boolean':
			return left === right;
		default:
			return false;
	}
}
