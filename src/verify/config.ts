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

import {type Bool, boolMake, type UInt, uIntMake} from '@toreda/strong-types';
import {type SchemaVerifyFlags} from '../schema/verify/flags';
import Defaults from '../defaults';
import {type Resettable} from '@toreda/types';

/**
 * @category Schemas
 */
export class SchemaVerifyConfig implements Resettable {
	public readonly failOnEmptyInputObject: Bool;
	public readonly minFieldCount: UInt;
	public readonly maxFieldCount: UInt;
	public readonly skipFirstTracerChild: Bool;

	constructor(flags?: SchemaVerifyFlags) {
		this.failOnEmptyInputObject = boolMake(
			Defaults.Schema.FailOnEmptyInputObject,
			flags?.failOnEmptyInputObject
		);

		this.skipFirstTracerChild = boolMake(
			Defaults.Schema.SkipFirstTracerChild,
			flags?.skipFirstTracerChild
		);
		this.maxFieldCount = uIntMake(Defaults.Schema.MaxFieldCount, flags?.maxFieldCount);
		this.minFieldCount = uIntMake(Defaults.Schema.MinFieldCount, flags?.minFieldCount);
	}

	public reset(): void {
		this.maxFieldCount.reset();
		this.minFieldCount.reset();
		this.skipFirstTracerChild.reset();
		this.failOnEmptyInputObject.reset();
	}
}
