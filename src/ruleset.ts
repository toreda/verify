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
import {type VerifierResult} from './verifier/result';
import {verify} from './verify';
import {type Verifier} from './verifier';
import {type BlockInit} from './block/init';
import {BlockContains} from './block/contains';
import {BlockMust} from './block/must';
import {BlockHave} from './block/have';
import {BlockMatch} from './block/match';
import {BlockIs} from './block/is';
import {blockWithNot} from './block/with/not';
import {type VerifierFlags} from './verifier/flags';
import {Tracer} from './tracer';

/**zz
 * @category Rulesets
 */
export class Ruleset<InputT = unknown> implements Verifier {
	public readonly rules: Rule<InputT>[];

	constructor() {
		this.rules = [];
		this.bindListeners();
	}

	private bindListeners(): void {
		this.verify = this.verify.bind(this);
	}

	public size(): number {
		return this.rules.length;
	}

	public add(...blocks: Block<Statement<InputT>>[]): boolean {
		if (!Array.isArray(blocks)) {
			return false;
		}

		const rule = new Rule<InputT>();

		for (const block of blocks) {
			rule.add(block.stmt);
		}

		this.addRule(rule);
		return true;
	}

	/**
	 * Add rule to statements verify
	 * @param rule
	 * @returns
	 */
	public addRule(rule: Rule<InputT>): boolean {
		if (!rule) {
			return false;
		}

		this.rules.push(rule);

		return true;
	}

	/**
	 * Get value object used to create new rules.
	 */
	public value(): Rule<InputT> {
		return new Proxy(new Rule<InputT>(), {
			get: (target: Rule<InputT>, prop: keyof Rule<InputT>): any => {
				const stmt = new Statement<InputT>();
				const init: BlockInit<InputT> = {
					stmt: stmt,
					tracer: new Tracer(),
					name: 'value'
				};

				/**
				 * IMPORTANT: Properties not listed here will are not accessible using the
				 * rule object property accessor (e.g. rule.contaians).
				 * When adding
				 */
				switch (prop) {
					case 'contains':
						target.add(stmt);
						return blockWithNot<InputT, BlockContains<InputT>>(BlockContains<InputT>, {
							...init,
							name: 'contains'
						});
					case 'must':
						target.add(stmt);
						return blockWithNot<InputT, BlockMust<InputT>>(BlockMust<InputT>, {
							...init,
							name: 'must'
						});
					case 'has':
						target.add(stmt);
						return blockWithNot<InputT, BlockHave<InputT>>(BlockHave<InputT>, {
							...init,
							name: 'has'
						});
					case 'matches':
						target.add(stmt);
						return blockWithNot<InputT, BlockMatch<InputT>>(BlockMatch<InputT>, {
							...init,
							name: 'matches'
						});
					case 'is':
						target.add(stmt);
						return blockWithNot<InputT, BlockIs<InputT>>(BlockIs<InputT>, {
							...init,
							name: 'is'
						});
					default:
						return target[prop];
				}
			}
		});
	}

	public async verify(value: InputT | null, flags?: VerifierFlags): Promise<Fate<VerifierResult>> {
		return await verify<InputT, Rule<InputT>>({
			name: 'rules',
			collection: this.rules,
			value: value,
			flags: flags
		});
	}

	/**
	 * Reset internal properties and children to their starting states.
	 */
	public reset(): void {
		for (const rule of this.rules) {
			if (rule) {
				rule.reset();
			}
		}

		this.rules.length = 0;
	}
}
