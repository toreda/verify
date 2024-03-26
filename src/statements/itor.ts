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

import {Statement} from '../value___';

/**
 * @category Statement Blocks
 */
export class StatementsItor<ValueT>
	implements Iterator<Statement<ValueT> | null, Statement<ValueT> | null, undefined>
{
	public ndx: number;
	private readonly _items: Statement<ValueT>[];

	constructor(items: Statement<ValueT>[]) {
		this._items = items;
		this.ndx = 0;
	}

	public next(): IteratorResult<Statement<ValueT> | null, Statement<ValueT> | null> {
		if (!this._items.length) {
			return {
				value: null,
				done: true
			} as IteratorReturnResult<Statement<ValueT> | null>;
		}

		const value = this._items[this.ndx];
		const done = this.ndx === this._items.length;

		this.ndx++;

		if (done === true) {
			return {
				value: value,
				done: true
			} as IteratorResult<Statement<ValueT> | null>;
		} else {
			return {
				value: value,
				done: false
			} as IteratorYieldResult<Statement<ValueT> | null>;
		}
	}
}
