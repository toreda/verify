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

import {type SchemaFieldData} from './field/data';
import type {SchemaOptions} from './options';
import {type SchemaOutputTransformer} from './output/transformer';
import {type LogLike} from '@toreda/shared-types';
import {type CustomTypesData} from '../custom/types/data';
import {type SchemaData} from './data';

/**
 * Schema Init
 *
 * Parameters needed to create a specific schema object.
 *
 * @category Schemas
 */
export interface SchemaInit<DataT, InputT extends SchemaData<DataT>, TransformedT = InputT> {
	/**
	 * Schema Name
	 */
	name: string;
	/**
	 * Schema Fields
	 *
	 * Details for each field that should be verified.
	 */
	fields: SchemaFieldData<InputT>[];
	/**
	 * Schema Options
	 *
	 * (optional) Flags & options that change verifier behavior.
	 */
	options?: SchemaOptions;
	transformOutput?: SchemaOutputTransformer<DataT, TransformedT | null>;
	/**
	 * Custom Types
	 *
	 * Custom schema types used by this schema.
	 */
	custom?: CustomTypesData<DataT, InputT> | null;
	/**
	 * Base Logger.
	 */
	base: LogLike;
	parentPath?: string[];
}
