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
	 *  trunc	-		Truncates digits down to `digits` value, with no rounding.
	 * 	ceil	-		Apply ceil, then truncate significant digits.
	 * 	floor	-		Apply floor, then truncate significant digits.
	 * 	round			Apply round, then truncate significant digits.
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
 * Convert a decimal value to readable percentage value.
 *
 * @param mode
 * @param value
 *
 * @category Labels
 */
export function pctLabelRound(value: number, init?: PctLabelRound): string {
	const mode = stringValue(init?.mode, 'none') as PctLabelRoundMode;
	const digits = numberValue(init?.digits, 1);

	if (!init || mode === 'none') {
		return value.toString();
	}

	switch (mode) {
		case 'ceil':
			return Math.ceil(value).toFixed(digits);
		case 'floor':
			return Math.floor(value).toFixed(digits);
		case 'round':
			return Math.round(value).toFixed(digits);
		case 'trunc':
			return value.toFixed(digits);
		default:
			return value.toFixed(digits);
	}
}
