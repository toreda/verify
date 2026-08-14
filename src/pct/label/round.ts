/**
 *	MIT License
 *
 *	Copyright (c) 2019 - 2026 Toreda, Inc.
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

import {numberValue, stringValue} from '@toreda/strong-types';
import {type PctLabelRoundMode} from './round/mode';

/**
 * Rounding Options
 *
 * @category Labels
 */
export interface PctLabelRound {
	/**
	 * Rounding Mode
	 *
	 * Math operation used for rounding. When set to 'none' the original value
	 * is returned unchanged.
	 *
	 * @remarks
	 * 	none	-		No rounding performed. Value returned as provided.
	 *  trunc	-		Truncates toward zero at `digits` precision, with no rounding.
	 * 	ceil	-		Apply ceil at `digits` precision.
	 * 	floor	-		Apply floor at `digits` precision.
	 * 	round			Apply round at `digits` precision.
	 *
	 * 	Unrecognized modes behave like 'none'.
	 */
	mode?: PctLabelRoundMode | null;
	/**
	 * Significant Digits
	 *
	 * Number of significant digits returned by the rounding operation,
	 * when rounding mode is not 'none' or undefined.
	 */
	digits?: number;
}

/**
 * Round a value to `init.digits` significant digits using `init.mode`, returning
 * the result as a string.
 *
 * @param value
 * @param init
 *
 * @category Labels
 */
export function pctLabelRound(value: number, init?: PctLabelRound): string {
	const mode = stringValue(init?.mode, 'none') as PctLabelRoundMode;
	const digits = numberValue(init?.digits, 1);

	if (!init || mode === 'none') {
		return value.toString();
	}

	// `toFixed` throws a RangeError outside 0 - 100. Clamp to keep bad input from
	// escaping as an exception, and drop fractional digit counts.
	const places = Math.min(Math.max(Math.trunc(digits), 0), 100);
	// Scale so the rounding operation applies at `places` precision instead of
	// collapsing the value to an integer.
	const factor = Math.pow(10, places);

	switch (mode) {
		case 'ceil':
			return (Math.ceil(value * factor) / factor).toFixed(places);
		case 'floor':
			return (Math.floor(value * factor) / factor).toFixed(places);
		case 'round':
			return (Math.round(value * factor) / factor).toFixed(places);
		case 'trunc':
			return (Math.trunc(value * factor) / factor).toFixed(places);
		default:
			// Unrecognized mode. Return the value unchanged, matching 'none'.
			return value.toString();
	}
}
