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

import {Fate} from '@toreda/fate';
import {schemaParse} from '../parse';
import {type SchemaParseInit} from './init';
import {schemaPrimitiveTransformer} from '../primitive/transformer';
import {type SchemaData} from '../data';
import {type Primitive} from '@toreda/types';

/**
 * Default parser for simple schemas only containing string keys and primitive values.
 * @param init
 * @returns
 *
 * @category Schemas
 */
export async function schemaParseSimple(
	init: SchemaParseInit<Primitive, SchemaData<Primitive>, SchemaData<Primitive>>
): Promise<Fate<SchemaData<Primitive> | null>> {
	return schemaParse({
		base: init.base,
		data: init.data,
		transformer: schemaPrimitiveTransformer,
		schema: init.schema
	});
}
