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

import {Fate} from '@toreda/fate';
import {BlockHave} from './block/have';
import {BlockIs} from './block/is';
import {BlockMust} from './block/must';
import {Statement} from './statement';
import {type BlockInit} from './block/init';
import {BlockMatch} from './block/match';
import {BlockContains} from './block/contains';
import {type VerifierResult} from './verifier/result';
import {verify} from './verify';
import {type Resettable} from '@toreda/types';
import {type BlockWithNot, blockWithNot} from './block/with/not';
import {BlockDoes} from './block/does';
import {type Verifier} from './verifier';
import {type VerifierFlags} from './verifier/flags';
import {Tracer} from './tracer';

/**
 * Base type for rule blocks.
 *
 * @category Rule Blocks
 */
export class Rule<InputT> implements Resettable, Verifier {
	/**
	 * IMPORTANT: New properties intended using rule syntax MUST be added to
	 * the switch statement in `value.ts`.
	 * @internal
	 */
	public readonly statements: Statement<InputT>[];
	public readonly does: BlockWithNot<BlockDoes<InputT>>;
	public readonly contains: BlockWithNot<BlockContains<InputT>>;
	public readonly must: BlockWithNot<BlockMust<InputT>>;
	public readonly is: BlockWithNot<BlockIs<InputT>>;
	public readonly has: BlockWithNot<BlockHave<InputT>>;
	public readonly matches: BlockWithNot<BlockMatch<InputT>>;

	constructor() {
		const stmt = new Statement<InputT>();
		const init: BlockInit<InputT> = {
			stmt: stmt,
			tracer: new Tracer(),
			name: 'value'
		};

		this.does = blockWithNot<InputT, BlockDoes<InputT>>(BlockDoes<InputT>, {
			...init,
			name: 'doesNot'
		});
		this.must = blockWithNot<InputT, BlockMust<InputT>>(BlockMust<InputT>, {
			...init,
			name: 'mustNot'
		});
		this.is = blockWithNot<InputT, BlockIs<InputT>>(BlockIs<InputT>, {
			...init,
			name: 'isNot'
		});
		this.matches = blockWithNot<InputT, BlockMatch<InputT>>(BlockMatch<InputT>, {
			...init,
			name: 'doesNotMatch'
		});
		this.has = blockWithNot<InputT, BlockHave<InputT>>(BlockHave<InputT>, {
			...init,
			name: 'hasNo'
		});
		this.contains = blockWithNot<InputT, BlockContains<InputT>>(BlockContains<InputT>, {
			...init,
			name: 'doesNotContain'
		});
		this.statements = [];

		this.bindListeners();
	}

	private bindListeners(): void {
		this.add = this.add.bind(this);
		this.verify = this.verify.bind(this);
	}

	/**
	 * Add statement to rule which are tested when `rule.verify(...)` is invoked. All rule
	 * statements must pass for the rule to pass.
	 * @param stmt
	 * @returns
	 */
	public add(stmt: Statement<InputT>): Rule<InputT> {
		if (!stmt) {
			return this;
		}

		this.statements.push(stmt);

		return this;
	}

	public async verify(value: InputT | null, flags?: VerifierFlags): Promise<Fate<VerifierResult>> {
		return verify<InputT, Statement<InputT>>({
			collection: this.statements,
			name: 'rule',
			value: value,
			flags: flags
		});
	}

	public reset(): void {
		this.statements.length = 0;
	}
}
