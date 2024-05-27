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
import {MatcherCallable} from './matcher/callable';
import {type MatcherParamId} from './matcher/param/id';
import {type Verifier} from './verifier';
import {type VerifierResult} from './verifier/result';
import {verify} from './verify';
import {type MatcherData} from './matcher/data';
import {type Int, intMake, Id, idMake} from '@toreda/strong-types';
import {errorMkCode} from './error/mk/code';
import {type VerifierFlags} from './verifier/flags';

/**
 * Holds matcher predicate functions that actually perform
 * some custom validation code. All matchers must
 * pass for statement execution to pass.
 *
 * @category Rule Blocks
 */
export class Statement<InputT = unknown> implements Verifier {
	private readonly nextMatcherId: Int;
	public readonly blocks: Block<Statement<InputT>>[];
	public readonly matchers: MatcherCallable<InputT>[];
	public readonly matcherParams: Map<MatcherParamId, unknown>;
	public readonly id: string[];

	constructor() {
		this.id = [];
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
	 * Add matcher to statement that's verifyd everytime statement.verify is
	 * invoked. Does not check for duplicates. Returns fate with boolean value
	 * indicating whether the matcher was successfully added.
	 * @param data		Matcher data to add
	 */
	public addMatcher(data: MatcherData<InputT>): Fate<boolean> {
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

		this.matchers.push(new MatcherCallable<InputT>(this.nextMatcherSlotId(), data));

		fate.data = true;
		return fate.setSuccess(true);
	}

	/**
	 * Test value against statement matchers.
	 * @param value		Value to be tested by statement.
	 */
	public async verify(value: InputT | null, flags?: VerifierFlags): Promise<Fate<VerifierResult>> {
		return await verify<InputT, MatcherCallable<InputT>>({
			name: 'matchers',
			collection: this.matchers,
			value: value,
			flags: flags
		});
	}

	/**
	 * Reset properties to their initial states. Used in serverless
	 * environments where variables are affected by caching, and
	 * in optizing unit tests.
	 */
	public reset(): void {
		this.nextMatcherId.reset();
		this.matchers.length = 0;
		this.matcherParams.clear();
		this.blocks.length = 0;
	}
}
