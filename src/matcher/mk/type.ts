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

import {BlockLink} from '../../block/link';
import {type MatcherFactory} from '../factory';
import {type Predicate} from '../../predicate';
import {type BlockInit} from '../../block/init';
import {isInt} from '../../is/int';
import {isUInt} from '../../is/uint';
import {type SchemaFieldType} from '../../schema/field/type';
import {isBoolean} from '../../is/boolean';
import {isUrl} from '@toreda/strong-types';
import {isString} from '../../is/string';

/**
 *
 * @category		Matcher – Factory Function
 */
export function matcherMkType<InputT = unknown>(
	init: BlockInit<InputT>
): MatcherFactory<InputT, SchemaFieldType<InputT>, BlockLink<InputT>> {
	return (typeName: SchemaFieldType<InputT>): BlockLink<InputT> => {
		const link = new BlockLink<InputT>(init);

		const fn: Predicate<InputT> = async (value?: InputT | null): Promise<boolean> => {
			// Only type name strings are supported here. Everything else is auto fail.
			if (typeof typeName !== 'string') {
				return false;
			}

			const isArray = typeName.endsWith('[]');
			if (isArray === true && !Array.isArray(value)) {
				return false;
			} else if (isArray === false && Array.isArray(value)) {
				return false;
			}

			// Super jank. Will return true for empty array which could
			// be filled with non-matching types in the future. But, there's
			// nothing more to do if we dont have elements to type check.
			if (Array.isArray(value) && value.length === 0) {
				return true;
			}

			const baseType = isArray ? typeName.substring(0, -2) : typeName;
			const typeValue = Array.isArray(value) ? value[0] : value;

			if (typeValue === null && baseType === 'null') {
				return true;
			}

			if (baseType === 'int') {
				return isInt(typeValue);
			}

			if (baseType === 'uint') {
				return isUInt(typeValue);
			}

			if (baseType === 'boolean') {
				return isBoolean(typeValue);
			}

			if (baseType === 'url') {
				return isUrl(typeValue);
			}

			if (baseType === 'string') {
				return isString(typeValue);
			}

			if (typeValue === undefined && baseType === 'undefined') {
				return true;
			}

			return typeof typeValue === baseType;
		};

		init.stmt.addMatcher({
			fn: fn,
			name: 'type',
			flags: init.flags,
			tracer: init.tracer
		});

		return link;
	};
}
