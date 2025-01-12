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

import {type SchemaFieldType} from '../type';

/**
 * Field type parsed from a single element in schema field types.
 *
 * @remarks
 * Field type names are parsed because short hand types are allowed to simplify schemas.
 * The optional operator `?` must be the LAST character in the type string.
 *
 * @category Schema Fields
 */
export interface SchemaFieldValueType<DataT = unknown> {
	/** Is `undefined` a valid field value in addition to `typeId`? */
	allowUndefined: boolean;
	/** Is `null` allowed in addition to `typeId`? */
	allowNull: boolean;
	/** Does type need to be an array of `typeId` items? */
	mustBeArray: boolean;
	/** Parsed field type value. */
	typeId: SchemaFieldType<DataT>;
}

/**
 * Parse a single field type string.
 *
 * @category Schema Fields
 */
export function schemaFieldValueType<DataT>(type?: string): SchemaFieldValueType<DataT> | null {
	if (typeof type !== 'string') {
		return null;
	}

	if (type.trim() === '') {
		return null;
	}

	const result: SchemaFieldValueType<DataT> = {
		allowUndefined: false,
		mustBeArray: false,
		allowNull: false,
		typeId: 'none'
	};

	let value = type;

	if (type.endsWith('?')) {
		value = value.slice(0, -1);
		result.allowUndefined = true;
	}

	if (type.endsWith('[]')) {
		value = value.slice(0, -2);
		result.mustBeArray = true;
	}

	// TODO: Add typecheck here.
	result.typeId = value;

	return result;
}
