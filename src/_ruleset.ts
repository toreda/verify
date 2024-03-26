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

import {Statements} from './statements';
import {Value} from './_value';
import {Fate} from '@toreda/fate';

/**
 * Generic type `ValueT` root node found in every validation rule chain. `ValueT` is the expected
 * type that will be validated passed down to each node in the chain.
 *
 * @category Rulesets
 */
export class _Ruleset<ValueT> {
	public readonly value: Value<ValueT>;
	public readonly chains: Statements<ValueT>;

	constructor() {
		this.value = new Value<ValueT>();
		this.chains = new Statements<ValueT>();
	}

	public async execute(value?: ValueT | null): Promise<Fate<never>> {
		const result = new Fate<never>();

		for (const chain of this.chains) {
			if (chain === null) {
				continue;
			}

			try {
				const chainResult = await chain.execute(value);
				if (!chainResult.success()) {
					result.setErrorCode(chainResult.errorCode());
				}
			} catch (e) {
				result.setErrorCode('exception');
			}
		}

		return result;
	}
}
