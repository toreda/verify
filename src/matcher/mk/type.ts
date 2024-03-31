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

import {BlockLink} from '../../block/link';
import {type MatcherFactory} from '../factory';
import {type Predicate} from '../../predicate';
import {type BlockInit} from '../../block/init';
/**
 *
 * @returns
 *
 * @category Matcher Predicate Factories
 */
export function matcherMkType(init: BlockInit): MatcherFactory<string, BlockLink> {
	return (typeName: string): BlockLink => {
		const link = new BlockLink(init);

		const fn: Predicate<string> = async (value?: string | null): Promise<boolean> => {
			if (typeName === 'array') {
				return Array.isArray(value);
			}

			return typeof value === typeName;
		};

		init.stmt.addMatcher<string>({
			fn: fn,
			flags: init.flags
		});

		return link;
	};
}
