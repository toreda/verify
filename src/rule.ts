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
import {BlockHave} from './block/have';
import {BlockIs} from './block/is';
import {BlockMust} from './block/must';
import {Statement} from './statement';
import {type BlockInit} from './block/init';
import {BlockMatch} from './block/match';
import {BlockContains} from './block/contains';
import {type ExecutionContext} from './execution/context';
import {executor} from './executor';
import {RuleConfig} from './rule/config';

/**
 * @category Rules
 */
export class Rule<InputT = unknown> {
	/**
	 * IMPORTANT: New properties intended using rule syntax MUST be added to
	 * the switch statement in `value.ts`.
	 */
	public readonly statements: Statement<InputT>[];
	public readonly contains: BlockContains<InputT>;
	public readonly must: BlockMust<InputT>;
	public readonly is: BlockIs<InputT>;
	public readonly has: BlockHave<InputT>;
	public readonly matches: BlockMatch<InputT>;
	private readonly cfg: RuleConfig;

	constructor() {
		const stmt = new Statement<InputT>();
		const init: BlockInit<InputT> = {
			stmt: stmt
		};

		this.cfg = new RuleConfig<InputT>();
		this.must = new BlockMust<InputT>(init);
		this.is = new BlockIs<InputT>(init);
		this.matches = new BlockMatch<InputT>(init);
		this.has = new BlockHave<InputT>(init);
		this.contains = new BlockContains<InputT>(init);
		this.statements = [];
		this.bindListeners();
	}

	private bindListeners(): void {
		this.add = this.add.bind(this);
		this.execute = this.execute.bind(this);
	}

	/**
	 * Add statement to rule which are tested when `rule.execute(...)` is invoked. All rule
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

	public async execute(value?: InputT | null): Promise<Fate<ExecutionContext>> {
		return executor<InputT, Statement<InputT>>({
			collection: this.statements,
			name: 'rule',
			value: value
		});
	}
}
