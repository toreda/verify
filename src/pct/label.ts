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

import {booleanValue, numberValue, stringNullValue, stringValue} from '@toreda/strong-types';
import {type PctLabelInit} from './label/init';
import {pctLabelRound} from './label/round';

/**
 * Format numeric values
 * @param init
 *
 * @category Labels
 */
export function pctLabel(init: PctLabelInit): string {
	const fallback = stringValue(init?.fallbackValue, '');
	const appendText = stringNullValue(init?.appendText, null);
	const prependText = stringNullValue(init?.prependText, null);
	const appendPctSign = booleanValue(init?.appendPctSign, true);
	const mult = numberValue(init?.multiplier, 100);

	if (!init) {
		return fallback;
	}

	let value: string;

	// string & number values are accepted. All others rejected.
	if (typeof init.value !== 'number' && typeof init.value !== 'string') {
		return fallback;
	}

	if (typeof init.value === 'number') {
		// NaN is not a valid Percentage display value here.
		if (isNaN(init.value)) {
			return fallback;
		}

		const denormalized = init.value * mult;
		value = denormalized.toString();
	} else {
		// Expects a string value if init.value isn't a number based type check & early drop
		// above. If this function is expanded to support more than number & string, this section
		// needs to either be last after all other types are checked, OR be placed inside a typeof
		// string check.
		value = pctLabelRound(parseFloat(init.value?.trim()), init.round);
	}

	// Prepend `prependText` value if it's a string value.
	if (prependText !== null) {
		value = `${prependText}${value}`;
	}

	// Always appends `appendText` (when set to string), or appends '%' when `appendPctSign`
	// is true (default), but not both.
	if (appendText !== null) {
		value = `${value}${appendText}`;
	} else if (appendPctSign === true) {
		value = `${value}%`;
	}

	return value;
}
