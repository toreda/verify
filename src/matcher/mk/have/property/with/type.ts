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

import {hasPropertyWithType} from '@toreda/strong-types';
import {type BlockInit} from '../../../../../block/init';
import {BlockLink} from '../../../../../block/link';

import {type Predicate} from '../../../../../predicate';
import {type MatcherFactory} from '../../../../factory';

/**
 * Expects a validation chain root node and returns an equalTo matcher node.
 *
 * @category		Matcher – Factory Function
 */
export function matcherMkHavePropertyWithType<InputT = unknown>(
	init: BlockInit<InputT>
): MatcherFactory<InputT, string, BlockLink<InputT>> {
	return (propName: string, type: string) => {
		// Link object MUST BE created during matcher func invocation. Moving it out into the surrounding closure
		// will cause infinite recursion & stack overflow.
		const link = new BlockLink<InputT>(init);

		const func: Predicate<InputT> = async (o?: InputT | null): Promise<boolean> => {
			return hasPropertyWithType(o, propName, type);
		};

		init.stmt.addMatcher({
			fn: func,
			name: init.name,
			flags: init.flags,
			tracer: init.tracer
		});

		return link;
	};
}
