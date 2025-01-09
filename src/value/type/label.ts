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

import {stringValue} from "@toreda/strong-types";
import {type ValueTypeId} from "./id";

/**
 * Get the type string for a value to be displayed in tracers, debugging, or
 * other human readable formats.
 *
 * @param value
 * @param typeId
 *
 * @category Schemas
 * @remarks
 * Identifying value types beyond JS native types is difficult without reflection.
 * Type labels are used to compare the value
 */
export function valueTypeLabel(value: unknown, id?: ValueTypeId): string {
	if (value === null) {
		return 'null';
	}

	if (Array.isArray(value)) {
		if (typeof id?.array === 'string') {
			return `${id.array}[]`;
		} else {
			return 'array';
		}
	}

	if (typeof value === 'object') {
		return stringValue(id?.object, 'object');
	}

	return typeof value;
}
