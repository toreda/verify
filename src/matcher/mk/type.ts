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
import {isInt} from '../../is/int';
/**
 *
 * @returns
 *
 * @category Matcher Predicate Factories
 */
export function matcherMkType<InputT = unknown>(
	init: BlockInit<InputT>
): MatcherFactory<InputT, string, BlockLink<InputT>> {
	return (typeName: string): BlockLink<InputT> => {
		const link = new BlockLink<InputT>(init);

		const fn: Predicate<InputT> = async (value?: InputT | null): Promise<boolean> => {
			// Only type name strings are supported here. Everything else is auto fail.
			if (typeof typeName !== 'string') {
				return false;
			}

			if (typeName === 'array') {
				return Array.isArray(value);
			}

			if (value === null && typeName === 'null') {
				return true;
			}

			if (typeName === 'int') {
				return isInt(value);
			}

			if (value === undefined && typeName === 'undefined') {
				return true;
			}

			return typeof value === typeName;
		};

		init.stmt.addMatcher({
			fn: fn,
			name: 'istype',
			flags: init.flags
		});

		return link;
	};
}
