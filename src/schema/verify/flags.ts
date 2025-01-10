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
 * Optional flags that change verification rules. Default values are used when
 * no flag is set.
 *
 * @category Schemas
 */
export interface SchemaVerifyFlags {
	maxFieldCount?: number;
	/**
	 * Minimum number of fields a schema must have to pass verification. Only requires
	 * that a schema has at least this number, but doesn't require they pass verification.
	 *
	 * @remarks
	 * Useful in cases where a schema has multiple optional fields, but some number are
	 * needed to be valid.
	 *
	 * @example
	 * When `minFieldCount` = 1, data with < 1 matching fields will fail. A schema with only
	 * 4 fields (all optional) and `minFieldCount` = 1 requires that at least one matching
	 * field be present to pass verification.
	 */
	minFieldCount?: number;
	/**
	 * Fail Verification on Empty Schema Object
	 *
	 * Whether calling schema.verify({}) causes verification to fail immediately.
	 */
	failOnEmptyInputObject?: boolean;
	skipFirstTracerChild?: boolean;
}
