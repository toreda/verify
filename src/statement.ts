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
import {type MatcherCall} from './matcher/call';
import {type MatcherParamId} from './matcher/param/id';
import {type Executable} from './executable';
import {ExecutionContext} from './execution/context';

/**
 * @category Statement Blocks
 */
export class Statement implements Executable {
	public readonly blocks: Block<Statement>[];
	public readonly matchers: MatcherBound<any>[];
	public readonly matcherParams: Map<MatcherParamId, unknown>;

	constructor() {
		this.blocks = [];
		this.matchers = [];
		this.matcherParams = new Map<MatcherParamId, unknown>();
	}

	public addMatcher<InputT = unknown, BoundaryT = unknown>(matcher: MatcherCall<InputT>): void {
		const bound = new MatcherBound<InputT>(matcher);
		this.matchers.push(bound);
	}

	public async execute<ValueT = unknown>(value?: ValueT | null): Promise<Fate<ExecutionContext>> {
		const mainResult = new Fate<ExecutionContext>();
		let successful = 0;
		const total = this.matchers.length;

		try {
			for (const matcher of this.matchers) {
				const subResult = await matcher.execute(value);

				// Matchers return codes when the matching function was interrupted or
				// could not finish evaluating.
				if (!subResult.ok()) {
					console.error(`value did not pass value: ${value} // ${subResult.errorCode()}`);
					mainResult.setErrorCode(subResult.errorCode());
					break;
				}

				if (subResult.data === true) {
					successful++;
				}
			}
		} catch (e: unknown) {
			const msg = e instanceof Error ? e.message : 'nonerr_type';
			console.error(`stmt.execute exception: ${msg}`);
			mainResult.setErrorCode('exception');
		}

		if (!mainResult.errorCode()) {
			mainResult.setSuccess(true);
			mainResult.data = successful === total;
		}

		return mainResult;
	}

	public reset(): void {
		this.matchers.length = 0;
		this.blocks.length = 0;
	}
}
