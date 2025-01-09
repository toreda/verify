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
 *	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHEWISE, ARISING FROM,
 *	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTRHER DEALINGS IN THE
 * 	SOFTWARE.
 *
 */

import {isDbl, isFloat, isUrl} from '@toreda/strong-types';
import {isUInt} from '../../../is/uint';
import {type Time} from '@toreda/time';
import {isIterable} from '../../../is/iterable';
import {isInt} from '../../../is/int';
import {SchemaFieldType} from '../../../schema/field/type';

/**
 * Determines if type name is a built-in schema type. Used to check if
 * declared field types are supported before performing actual validation.
 *
 * @param type
 * @param value
 *
 * @category Schema Fields
 */
export function verifySchemaFieldContent<DataT = unknown>(
	type: SchemaFieldType<DataT>,
	value: unknown
): value is DataT {
	if (typeof type !== 'string') {
		return false;
	}

	switch (type) {
		case 'null':
			return value === null;
		case 'bigint':
			return typeof value === 'bigint';
		case 'boolean':
			return typeof value === 'boolean';
		case 'double':
			return isDbl(value as number);
		case 'dbl':
			return isDbl(value as number);
		case 'float':
			return isFloat(value as number);
		case 'int':
			return isInt(value);
		case 'iterable':
			return isIterable(value);
		case 'number':
			return typeof value === 'number' && isFinite(value);
		case 'string':
			return typeof value === 'string';
		case 'time':
			return (value as Time)?.type === 'time';
		case 'undefined':
			return value === undefined;
		case 'uint':
			return isUInt(value);
		case 'url':
			return isUrl(value as string);
		default:
			return false;
	}
}
