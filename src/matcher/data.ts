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

import type {BlockFlags} from '../block/flags';
import {type Predicate} from '../predicate';
import {Tracer} from '../tracer';
import {type MatcherExplainData} from './explain/data';

/**
 * Data used to create a callable matcher.
 * @category Matchers
 */
export interface MatcherData<InputT = unknown> {
	/**
	 * @name Matcher Call Name
	 * @description Name used in creation of a unique ID for bound matcher. There are
	 * no character or length limitations. Short, readable, and unique names are
	 * ideal because the ID is used in debugging and stack traces.
	 */
	name: string;
	/**
	 * @name Matcher Predicate Function
	 * @description Predicate function that expects one or more arguments of generic type
	 * InputT and returns a boolean indicating whether it's valid.
	 */
	fn: Predicate<InputT>;
	tracer: Tracer;
	/**
	 * @name Matcher Call Flags
	 * @description Optional flags passed to a matcher during binding to change
	 * its behavior.
	 */
	flags?: BlockFlags;
	explain?: MatcherExplainData<InputT>;
}
