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
		this.must = new BlockMust(stmt);
		this.is = new BlockIs(stmt);
		this.has = new BlockHave(stmt);
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

	public async execute<ValueT = unknown>(value?: ValueT | null): Promise<Fate<never>> {
		const mainResult = new Fate<never>();

		try {
			for (const stmt of this.statements) {
				const stmtResult = await stmt.execute<ValueT>(value);
			}
		} catch (e: unknown) {
			mainResult.setErrorCode('exception');
		}

		return mainResult;
	}
}
