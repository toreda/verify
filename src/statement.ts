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

import type {ANY} from '@toreda/types';
import {Value} from './value';
import {MatcherBound} from './matcher/bound';
import type {MatcherCall} from './matcher/call';

/**
 * Each statement has one root block.
 *
 * @category Statement Blocks
 */
export class Statement<ValueT = unknown> {
	public readonly value: Value<ValueT>;
	public readonly blocks: MatcherBound<ValueT, ANY>[];

	constructor(value: Value<ValueT>) {
		this.value = value;
		this.blocks = [];
	}

	public addBlock<ParamT>(call: MatcherCall<ValueT, ParamT>): boolean {
		let result = true;

		try {
			const bound = new MatcherBound<ValueT, ParamT>(call);
			this.blocks.push(bound);
		} catch (e) {
			result = false;
		}

		return result;
	}
}
