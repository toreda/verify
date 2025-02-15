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

import {Block} from '../block';
import {type MatcherFactory} from '../matcher/factory';
import {matcherMkArray} from '../matcher/mk/array';
import {matcherMkIpv4Addr} from '../matcher/mk/ipv4addr';
import {matcherMkIpv6Addr} from '../matcher/mk/ipv6addr';
import {matcherMkUint} from '../matcher/mk/uint';
import {Statement} from '../statement';
import {type BlockInit} from './init';
import {BlockLink} from './link';

/**
 * @category Rule Blocks
 */
export class BlockA<InputT = unknown> extends Block<Statement<InputT>> {
	public readonly array: MatcherFactory<InputT, never, BlockLink<InputT>>;
	public readonly uint: MatcherFactory<InputT, never, BlockLink<InputT>>;
	public readonly ipv4addr: MatcherFactory<InputT, never, BlockLink<InputT>>;
	public readonly ipv6addr: MatcherFactory<InputT, never, BlockLink<InputT>>;

	constructor(init: BlockInit<InputT>) {
		super(
			{
				name: init.name,
				blockType: 'a',
				tracer: init.tracer
			},
			init.stmt
		);

		this.array = matcherMkArray<InputT>(init);
		this.uint = matcherMkUint<InputT>(init);
		this.ipv4addr = matcherMkIpv4Addr<InputT>(init);
		this.ipv6addr = matcherMkIpv6Addr<InputT>(init);
	}
}
