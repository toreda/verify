/**
 *	MIT License
 *
 *	Copyright (c) 2023 Toreda, Inc.
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

import type {ErrorCodeData} from './code/data';
import {ErrorConfig} from './config';
import {ErrorContext} from './context';
import type {Stringable} from '@toreda/types';
import {errorCodeConfigKeys} from './code/config/keys';
import {errorCodePathDelimiter} from './code/path/delimiter';
import {errorCodeToken} from './code/token';

/**
 * @category Error Codes
 */
export class ErrorCode<CodeT extends string, RootT extends string, PathT extends string>
	implements Stringable
{
	public readonly context: ErrorContext<RootT, PathT>;
	/** Error code returned by entity. */
	public readonly code: string;
	/** Custom delimiter string overriding the default path delimiter for this
	 * 	error code object only. Separates entity and each path component string.*/
	public readonly customPathDelim: string | undefined;
	/** Custom code token overriding the default code token for this error code object only.
	 *	Signals the end of the entity & path string and start of the error code. */
	public readonly customCodeToken: string | undefined;

	public readonly text: string | undefined;
	public readonly cfg: ErrorConfig;

	constructor(code: CodeT, root: RootT, ...path: PathT[]) {
		this.code = code;
		this.context = new ErrorContext<RootT, PathT>(root, ...path);
		this.cfg = {};
	}

	public setConfig(key: string, value: unknown): boolean {
		if (typeof key !== 'string') {
			return false;
		}

		if (!errorCodeConfigKeys.has(key)) {
			return false;
		}

		this.cfg[key] = value;

		return true;
	}

	/**
	 * Convert error code object to a simple data object which is easily serialized,
	 * stored, or transported.
	 *
	 * @returns
	 */
	public toData(): ErrorCodeData {
		return {
			context: this.context.toData(),
			code: this.code,
			text: this.text,
			cfg: this.cfg
		};
	}

	/**
	 * Get error code with error entity and path returned as a string.
	 * @returns
	 */
	public toString(): string {
		const delim = errorCodePathDelimiter(this.cfg.customPathDelim);
		const token = errorCodeToken(this.cfg.customCodeToken);

		const base = `${this.context.root}${delim}${this.context.path.join(delim)}`;

		return `${base}${token}${this.code}`;
	}
}
