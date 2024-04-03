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

import {type BlockInit} from '../../../block/init';
import {BlockLink} from '../../../block/link';
import {lessThan} from '../../../less/than';
import {type Predicate} from '../../../predicate';
import {type MatcherFactory} from '../../factory';
/**
 * Create matcher for validation chain which determines if chain value is less than target.
 * @param init
 * @returns
 *
 * @category Matcher Predicate Factories
 */
export function matcherMkLessThan(init: BlockInit): MatcherFactory<number, BlockLink> {
	return (right: number): BlockLink => {
		// Link object MUST BE created during matcher func invocation. Moving it out into the surrounding closure
		// will cause infinite recursion & stack overflow.
		const link = new BlockLink(init);

		const func: Predicate<number> = async (value?: number | null): Promise<boolean> => {
			return lessThan(value, right);
		};

		init.stmt.addMatcher<number>({
			fn: func,
			name: '<',
			flags: init.flags
		});

		return link;
	};
}
