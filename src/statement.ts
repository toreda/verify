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

import {Fate} from '@toreda/fate';
import {Block} from './block';
import {MatcherBound} from './matcher/bound';
import {type MatcherParamId} from './matcher/param/id';
import {type Executable} from './executable';
import {type ExecutionContext} from './execution/context';
import {executor} from './executor';
import {type MatcherData} from './matcher/data';
import {type Int, intMake} from '@toreda/strong-types';
import {errorMkCode} from './error/mk/code';

/**
 * Contains a set of matchers 
 *
 *
 * @category Statement Blocks
 */
export class Statement implements Executable {
	private readonly nextMatcherId: Int;
	public readonly blocks: Block<Statement>[];
	public readonly matchers: MatcherBound<any>[];
	public readonly matcherParams: Map<MatcherParamId, unknown>;

	constructor() {
		this.blocks = [];
		this.matchers = [];
		this.nextMatcherId = intMake(0);
		this.matcherParams = new Map<MatcherParamId, unknown>();
	}

	/**
	 * Get statement's next available matcher position ID and
	 * the current position ID.
	 */
	public nextMatcherSlotId(): number {
		const value = this.nextMatcherId();
		this.nextMatcherId.increment();

		return value;
	}

	/**
	 * Add matcher to statement that's executed everytime statement.execute is
	 * invoked. Does not check for duplicates. Returns fate with boolean value
	 * indicating whether the matcher was successfully added.
	 * @param data		Matcher data to add
	 */
	public addMatcher<InputT = unknown>(data: MatcherData<InputT>): Fate<boolean> {
		const fate = new Fate<boolean>({
			data: false
		});

		if (!data) {
			return fate.setErrorCode(errorMkCode('missing_argument', 'statement', 'arg:data'));
		}

		if (data.name === undefined || data.name === null) {
			return fate.setErrorCode(errorMkCode('missing_property', 'statement', 'arg:data.name'));
		}

		if (!data.fn) {
			return fate.setErrorCode(errorMkCode('missing_argument', 'statement', 'arg:data.fn'));
		}

		if (typeof data.name !== 'string') {
			return fate.setErrorCode(errorMkCode('nonstring_property', 'statement', 'arg:data.name'));
		}

		if (typeof data.fn !== 'function') {
			return fate.setErrorCode(errorMkCode('nonfunction_property', 'statement', 'arg:data.fn'));
		}

		const bound = new MatcherBound<InputT>(this.nextMatcherSlotId(), data);
		this.matchers.push(bound);

		fate.data = true;
		return fate.setSuccess(true);
	}

	/**
	 * Test value against statement matchers.
	 * @param value		Value to be tested by statement.
	 */
	public async execute<ValueT = unknown>(value?: ValueT | null): Promise<Fate<ExecutionContext>> {
		return await executor<ValueT, MatcherBound<ValueT>>({
			name: 'statements',
			collection: this.matchers,
			value: value
		});
	}

	public reset(): void {
		this.nextMatcherId.reset();
		this.matchers.length = 0;
		this.matcherParams.clear();
		this.blocks.length = 0;
	}
}
