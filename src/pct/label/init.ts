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

import {type PctLabelRound} from './round';
import {type PctLabelWraps} from './wraps';

/**
 * @category Labels
 */
export interface PctLabelInit {
	/**
	 * Fallback Value
	 * Returned by function when `value` can't be returned due to validation problems
	 * or function errors.
	 *
	 * @defaultValue '' (empty string)
	 */
	fallbackValue?: string;
	value: number | string | null;
	/**
	 * Append Text
	 * Text appended to final formatted label.
	 *
	 * @defaultValue `undefined`
	 */
	appendText?: string | null;
	/**
	 * Prepend Text
	 * Text prepended to final formatted label.
	 *
	 * @defaultValue `undefined`
	 */
	prependText?: string | null;
	/** */
	appendPctSign?: boolean | null;
	/**
	 * Multiplier
	 *
	 * Multiply decimal values by this number before returning
	 * the formatted display value.
	 *
	 * @defaultValue 100
	 */
	multiplier?: number | null;
	/**
	 * Wrap Formatted Value
	 */
	wrapIn?: PctLabelWraps;
	/**
	 * Rounding Mode
	 */
	round?: PctLabelRound;
}
