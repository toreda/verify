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

import {BlockContains} from './block/contains';
import {BlockHave} from './block/have';
import {type BlockInit} from './block/init';
import {BlockIs} from './block/is';
import {BlockMatch} from './block/match';
import {BlockMust} from './block/must';
import {Rule} from './rule';
import {Statement} from './statement';

export const target = new Proxy(new Rule(), {
	get: (target: Rule, prop: keyof Rule | keyof Rule): any => {
		console.info('@@@@@@@@@@@@@@@@@@@@');
		const stmt = new Statement();
		const init: BlockInit = {
			stmt: stmt
		};
		switch (prop) {
			case 'contains':
				target.add(stmt);
				return new BlockContains(init);
			case 'must':
				target.add(stmt);
				return new BlockMust(init);
			case 'has':
				target.add(stmt);
				return new BlockHave(init);
			case 'matches':
				target.add(stmt);
				return new BlockMatch(init);
			case 'is':
				target.add(stmt);
				return new BlockIs(init);
			default:
				return target[prop];
		}
	}
});
