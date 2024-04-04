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
import {Rule} from './rule';
import {Block} from './block';
import {Statement} from './statement';
import {type ExecutionContext} from './execution/context';
import {executor} from './executor';
import {type Executable} from './executable';

/**
 * @category Rulesets
 */
export class Ruleset<InputT = unknown> implements Executable {
	public readonly rules: Rule<InputT>[];

	constructor() {
		this.rules = [];

		this.bindListeners();
	}

	private bindListeners(): void {
		this.execute = this.execute.bind(this);
	}

	public add(...blocks: Block<Statement>[]): boolean {
		if (!Array.isArray(blocks)) {
			return false;
		}

		const rule = new Rule();

		for (const block of blocks) {
			rule.add(block.stmt);
		}

		this.addRule(rule);
		return true;
	}

	public addRule(rule: Rule): boolean {
		if (!rule) {
			return false;
		}

		this.rules.push(rule);

		return true;
	}

	public async execute(value?: InputT | null): Promise<Fate<ExecutionContext>> {
		return await executor<InputT, Rule<InputT>>({
			name: 'rules',
			collection: this.rules,
			value: value,
			flags: {
				maxFails: 0
			}
		});
	}

	public reset(): void {
		this.rules.length = 0;
	}
}
