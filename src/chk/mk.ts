/**
 *	MIT License
 *
 *	Copyright (c) 2022 Toreda, Inc.
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

import {Chk} from '../chk';
import {ChkChain} from './chain';
import {ChkRoot} from '../chk/root';
import {Fate} from '@toreda/fate';

export function chkMk<ValueT>(): Chk<ValueT> {
	const root = new ChkRoot<ValueT>();
	const chain = new ChkChain<ValueT>(root);

	return Object.assign(
		async (value?: ValueT | null): Promise<Fate<ValueT>> => {
			return root.execute(value);
		},
		{
			must: chain.must,
			contains: chain.contains,
			has: chain.has,
			is: chain.is,
			matches: chain.matches,
			value: root.value
		}
	);
}
