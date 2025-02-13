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

import {Log} from '@toreda/log';
import {Tracer} from '../../tracer';
import {type SchemaVerifyFlags} from './flags';
import {type SchemaData} from '../data';

/**
 * Arguments needed for schema verification.
 *
 * @category Schemas
 */
export interface SchemaVerifyInit<DataT = unknown> {
	/** Optional ID used in printed schema paths. Schema name is used when id not provided. */
	schemaId?: string;
	/** Data to be verified and optionally transformed. */
	data: SchemaData<DataT> | null;
	/** Current path of properties accessed to reach this point. */
	tracer?: Tracer;
	base: Log;
	/** Whether schema being processed is a child property of another schema. */
	childSchema?: boolean;
	typeId?: string;
	flags?: SchemaVerifyFlags;
}
