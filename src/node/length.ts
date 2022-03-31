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

import {ChkChainRoot} from '../chk/chain/root';
import {LessThanArgs} from 'src/matcher/less/than/args';
import type {MatcherEqualTo} from '../matcher/equal/to';
import type {MatcherGreaterThan} from '../matcher/greater/than';
import type {MatcherLessThan} from '../matcher/less/than';
import {NodeLink} from './link';
import {matcherEqualToMk} from '../matcher/equal/to/mk';
import {matcherGreaterThanMk} from '../matcher/greater/than/mk';
import {matcherLessThanMk} from '../matcher/less/than/mk';

/**
 * @category Nodes
 */
export class NodeLength<ValueT> {
	public readonly equalTo: MatcherEqualTo<ValueT, NodeLink<ValueT>>;
	public readonly lessThan: MatcherLessThan<LessThanArgs, NodeLink<ValueT>>;
	public readonly greaterThan: MatcherGreaterThan<NodeLink<ValueT>>;

	constructor(root: ChkChainRoot<ValueT>) {
		const link = new NodeLink<ValueT>(root);

		this.lessThan = matcherLessThanMk<ValueT>(root, link);
		this.greaterThan = matcherGreaterThanMk<LessThanArgs, NodeLink<ValueT>>(root, link);
		this.equalTo = matcherEqualToMk<ValueT, NodeLink<ValueT>>(root, link);
	}
}
