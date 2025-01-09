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

import {Fate} from '@toreda/fate';
import {Rule} from '../rule';
import {Statement} from '../statement';
import {BlockContains} from './contains';
import {BlockHave} from './have';
import {BlockIs} from './is';
import {BlockMatch} from './match';
import {BlockMust} from './must';
import {BlockWithNot} from './with/not';
import {type VerifierResult} from '../verifier/result';
import {type VerifierFlags} from '../verifier/flags';
import {BlockDoes} from './does';

/**
 * Wrapper type returned by proxy function.
 *
 * @category Rule Blocks
 */
export type BlockWrapper<InputT> =
	| BlockWithNot<
			| BlockContains<InputT>
			| BlockMust<InputT>
			| BlockHave<InputT>
			| BlockMatch<InputT>
			| BlockDoes<InputT>
			| BlockIs<InputT>
	  >
	| Rule<InputT>
	| Statement<InputT>[]
	| ((stmt: Statement<InputT>) => Rule<InputT>)
	| ((value: InputT | null, flags?: VerifierFlags) => Promise<Fate<VerifierResult>>)
	| (() => void);
