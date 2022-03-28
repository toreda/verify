/**
 *	MIT License
 *
 *	Copyright (c) 2022 Toreda, Inc.
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

import Defaults from '../defaults';
import type {ErrorCodeData} from './code/data';
import type {ErrorCodeFlags} from './code/flags';
import type {Stringable} from '@toreda/types';
import {errorCodePathDelimiter} from './code/path/delimiter';
import {errorCodeToken} from './code/token';

/**
 * @category Errors
 */
export class ErrorCode<EntityT extends string, PathT extends string, CodeT extends string>
	implements Stringable
{
	/** Entity which error is referring to. */
	public readonly entity: string;
	/** Component path identifying the specific property, system, or child
	 * 	object within Entity which reror code refers to. */
	public readonly path: string[];
	/** Error code returned by entity. */
	public readonly code: string;
	/** Custom delimiter string overriding the default path delimiter for this
	 * 	error code object only. Separates entity and each path component string.*/
	public readonly customPathDelim: string | undefined;
	/** Custom code token overriding the default code token for this error code object only.
	 *	Signals the end of the entity & path string and start of the error code. */
	public readonly customCodeToken: string | undefined;

	public readonly text: string | undefined;

	constructor(entity: EntityT, path: PathT | PathT[], code: CodeT, args?: ErrorCodeFlags) {
		this.entity = entity ?? Defaults.ErrorCode.Entity;
		this.path = this.mkPath(path);
		this.code = code ?? Defaults.ErrorCode.CodeToken;

		this.text = args?.text;
		this.customPathDelim = args?.pathDelimiter;
		this.customCodeToken = args?.codeToken;
	}

	/**
	 * Create path component from arg string or array of strings.
	 * @param value
	 * @param args
	 * @returns
	 */
	public mkPath(value?: PathT | PathT[] | null): string[] {
		if (Array.isArray(value)) {
			return value;
		}

		if (typeof value === 'string') {
			return [value];
		}

		return [];
	}

	/**
	 * Convert error code object to a simple data object which is easily serialized,
	 * stored, or transported.
	 *
	 * @returns
	 */
	public toData(): ErrorCodeData {
		return {
			entity: this.entity,
			path: this.path,
			code: this.code,
			text: this.text,
			customCodeToken: this.customCodeToken,
			customPathDelim: this.customPathDelim
		};
	}

	/**
	 * Get error code with error entity and path returned as a string.
	 * @returns
	 */
	public toString(): string {
		const delim = errorCodePathDelimiter(this.customPathDelim);
		const token = errorCodeToken(this.customCodeToken);

		const base = `${this.entity}${delim}${this.path.join(delim)}`;

		return `${base}${token}${this.code}`;
	}
}
