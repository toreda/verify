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
import {BlockInit} from './block/init';

/**
 * @category Rules
 */
export class Rule {
	public readonly statements: Statement[];
	public readonly must: BlockMust;
	public readonly is: BlockIs;
	public readonly has: BlockHave;

	constructor() {
		const stmt = new Statement();
		const init: BlockInit = {
			stmt: stmt
		};
		this.must = new BlockMust(init);
		this.is = new BlockIs(init);
		this.has = new BlockHave(init);
		this.statements = [];
		this.bindListeners();
	}

	private bindListeners(): void {
		this.add = this.add.bind(this);
		this.execute = this.execute.bind(this);
	}

	public add(stmt: Statement): void {
		if (!stmt) {
			return;
		}

		this.statements.push(stmt);
	}

	public async execute<ValueT = unknown>(value?: ValueT | null): Promise<Fate<boolean>> {
		const result = new Fate<boolean>();
		let successful = 0;
		const stmtCount = this.statements.length;

		try {
			for (const stmt of this.statements) {
				try {
					const subResult = await stmt.execute<ValueT>(value);
					if (!subResult.ok()) {
						result.setErrorCode(`stmt_exception:${subResult.errorCode()}`);
						break;
					}

					if (subResult.data === true) {
						successful++;
					}
				} catch (e: unknown) {
					const msg = e instanceof Error ? e.message : 'unknown_err_type';
					console.error(`Ruleset execute exception: ${msg}.`);
					result.setErrorCode('exception');
				}
			}
		} catch (e: unknown) {
			const msg = e instanceof Error ? e.message : 'unknown_err_type';
			console.error(`Ruleset execute exception: ${msg}.`);
			result.setErrorCode('exception');
		}

		if (!result.errorCode()) {
			result.setSuccess(true);
		}

		const failed = stmtCount - successful;
		if (successful === stmtCount) {
			console.debug(`${successful} of ${stmtCount} statements passed.`);
			result.data = true;
		} else {
			result.data = false;
			console.error(`${failed} of ${stmtCount} statements did not pass.`);
		}

		return result;
	}
}
