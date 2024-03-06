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

import {StatementRoot} from './statement/root';
//import {Ruleset} from './_ruleset';
import {Fate} from '@toreda/fate';
import {BlockContains} from './block/contains';
import {BlockHave} from './block/have';
import {BlockIs} from './block/is';
import {BlockMatch} from './block/match';
import {BlockMust} from './block/must';
import {type Resettable} from '@toreda/types';
import {StatementInit} from './statement/init';

/**
 * Rule chain containing one or more rules
 *
 * @category Statements
 */
export class Statement<ValueT> implements Resettable {
	private readonly root: StatementRoot<ValueT>;
	public readonly must: BlockMust<ValueT>;
	public readonly contains: BlockContains<ValueT>;
	public readonly is: BlockIs<ValueT>;
	public readonly has: BlockHave<ValueT>;
	public readonly matches: BlockMatch<ValueT>;

	constructor(init: StatementInit<ValueT>) {
		this.assertInit(init);
		const chainRoot = new StatementRoot<ValueT>(init.value);
		this.must = new BlockMust<ValueT>(chainRoot);
		this.contains = new BlockContains<ValueT>(chainRoot);
		this.has = new BlockHave<ValueT>(chainRoot);
		this.is = new BlockIs<ValueT>(chainRoot);
		this.matches = new BlockMatch<ValueT>(chainRoot);

		this.root = chainRoot;
	}

	private assertInit(init: StatementInit<ValueT>): asserts init is StatementInit<ValueT> {
		if (!init) {
			throw new Error(`Missing argument in stmt ctor: init`);
		}

		if (!init.value) {
			throw new Error(`Missing init property in stmt ctor: init.value`);
		}
	}

	/**
	 * Execute all matchers in this chain in the order they were added.
	 * @param value
	 * @returns
	 */
	public async execute(value?: ValueT | null): Promise<Fate<never>> {
		const fate = new Fate<never>();

		let succeeded = 0;
		let executed = 0;
		for (const matcher of this.root.matchers) {
			try {
				const result = await matcher.execute(value);
				if (result.success()) {
					succeeded++;
				} else {
					fate.setErrorCode(result.errorCode());
				}
			} catch (e) {
				fate.setErrorCode(`execute:matcher:error`);
				fate.error(e);
			}

			executed++;
		}

		// Chain execution result is success when all matchers returned
		// successful validation results.
		if (executed === succeeded) {
			fate.setSuccess(true);
		}

		return fate;
	}

	public reset(): void {}
}
