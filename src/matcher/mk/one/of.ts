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

import {BlockLink} from '../../../block/link';
import {type Primitive} from '@toreda/types';
import {type MatcherInit} from '../../init';
import {type Predicate} from '../../../predicate';
import {type MatcherFactory} from '../../factory';

/**
 * @description Create matcher for validat * @param root		Root node in validation chain matcher will be added to.
ion chain which determines if chain value is less than target.
 * @returns
 *
 * @category Matcher Predicate Factories
 */
export function matcherMkOneOf(init: MatcherInit): MatcherFactory<Primitive[], BlockLink> {
	return (right: Primitive[]): BlockLink => {
		// Link object MUST BE created during matcher func invocation. Moving it to
		///surrounding closure will cause infinite recursion & stack overflow.
		const link = new BlockLink(init.stmt);

		const func: Predicate<Primitive> = async (value?: Primitive | null): Promise<boolean> => {
			if (!Array.isArray(right)) {
				return false;
			}

			if (value === undefined) {
				return false;
			}

			for (const item of right) {
				if (value === null && item === null) {
					return true;
				}

				if (value === item) {
					return true;
				}
			}

			return false;
		};

		init.stmt.addMatcher<Primitive, Primitive[]>({
			fn: func,
			flags: init.flags
		});

		return link;
	};
}
