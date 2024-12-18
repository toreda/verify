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

import type {Code} from './code';
import {CodeDefaults} from './code/defaults';

/**
 * Global Error codes.
 *
 * @category Error Handling
 */
export class Codes {
	private static instance: Codes;
	private codeMap: Map<Code, string>;

	private constructor() {
		this.codeMap = new Map<Code, string>();
	}

	public static getInstance(): Codes {
		if (!Codes.instance) {
			Codes.instance = new Codes();
		}

		return Codes.instance;
	}

	public static set(code: Code, value: string): void {
		const instance = Codes.getInstance();
		instance.codeMap.set(code, value);
	}

	public static badArgFormat(): string {
		const instance = Codes.getInstance();
		const value = instance.codeMap.get('bad_arg_format');

		return typeof value === 'string' ? value : CodeDefaults.Missing;
	}

	public static missing(): string {
		const instance = Codes.getInstance();
		const value = instance.codeMap.get('missing');

		return typeof value === 'string' ? value : CodeDefaults.Missing;
	}

	public static missingArg(): string {
		const instance = Codes.getInstance();
		const value = instance.codeMap.get('missing_arg');

		return typeof value === 'string' ? value : CodeDefaults.MissingArg;
	}

	public static missingValue(): string {
		const instance = Codes.getInstance();
		const value = instance.codeMap.get('missing_value');

		return typeof value === 'string' ? value : CodeDefaults.MissingValue;
	}

	public static missingConfig(): string {
		const instance = Codes.getInstance();
		const value = instance.codeMap.get('missing_config');

		return typeof value === 'string' ? value : CodeDefaults.MissingConfig;
	}

	public static unsupportedConfig(): string {
		const instance = Codes.getInstance();
		const value = instance.codeMap.get('unsupported_config');

		return typeof value === 'string' ? value : CodeDefaults.UnsupportedConfig;
	}

	public static missingId(): string {
		const instance = Codes.getInstance();
		const value = instance.codeMap.get('missing_id');

		return typeof value === 'string' ? value : CodeDefaults.MissingId;
	}

	public static badData(): string {
		const instance = Codes.getInstance();
		const value = instance.codeMap.get('bad_data');

		return typeof value === 'string' ? value : CodeDefaults.BadData;
	}

	public static badContent(): string {
		const instance = Codes.getInstance();
		const value = instance.codeMap.get('bad_content');

		return typeof value === 'string' ? value : CodeDefaults.BadContent;
	}

	public static badFormat(): string {
		const instance = Codes.getInstance();
		const value = instance.codeMap.get('bad_format');

		return typeof value === 'string' ? value : CodeDefaults.BadFormat;
	}

	public static exception(): string {
		const instance = Codes.getInstance();
		const value = instance.codeMap.get('exception');

		return typeof value === 'string' ? value : CodeDefaults.Exception;
	}

	public static error(): string {
		const instance = Codes.getInstance();
		const value = instance.codeMap.get('error');

		return typeof value === 'string' ? value : CodeDefaults.Error;
	}

	public static unsupportedType(): string {
		const instance = Codes.getInstance();
		const value = instance.codeMap.get('unsupported_type');

		return typeof value === 'string' ? value : CodeDefaults.UnsupportedType;
	}

	public static unsupportedVersion(): string {
		const instance = Codes.getInstance();
		const value = instance.codeMap.get('unsupported_version');

		return typeof value === 'string' ? value : CodeDefaults.UnsupportedVersion;
	}

	public static notAuthorized(): string {
		const instance = Codes.getInstance();
		const value = instance.codeMap.get('not_authorized');

		return typeof value === 'string' ? value : CodeDefaults.NotAuthorized;
	}

	public static unsupportedValue(): string {
		const instance = Codes.getInstance();
		const value = instance.codeMap.get('unsupported_value');

		return typeof value === 'string' ? value : CodeDefaults.UnsupportedValue;
	}

	public static unknownError(): string {
		const instance = Codes.getInstance();
		const value = instance.codeMap.get('unknown_error');

		return typeof value === 'string' ? value : CodeDefaults.UnknownError;
	}

	public static emptyConfig(): string {
		const instance = Codes.getInstance();
		const value = instance.codeMap.get('empty_config');

		return typeof value === 'string' ? value : CodeDefaults.EmptyConfig;
	}

	public static emptyString(): string {
		const instance = Codes.getInstance();
		const value = instance.codeMap.get('empty_string');

		return typeof value === 'string' ? value : CodeDefaults.EmptyString;
	}

	public static emptyValue(): string {
		const instance = Codes.getInstance();
		const value = instance.codeMap.get('empty_value');

		return typeof value === 'string' ? value : CodeDefaults.EmptyValue;
	}

	public static emptyObject(): string {
		const instance = Codes.getInstance();
		const value = instance.codeMap.get('empty_object');

		return typeof value === 'string' ? value : CodeDefaults.EmptyObject;
	}

	public static emptyArray(): string {
		const instance = Codes.getInstance();
		const value = instance.codeMap.get('empty_array');

		return typeof value === 'string' ? value : CodeDefaults.EmptyArray;
	}

	public static emptyArg(): string {
		const instance = Codes.getInstance();
		const value = instance.codeMap.get('empty_arg');

		return typeof value === 'string' ? value : CodeDefaults.EmptyArg;
	}

	public static tooShort(): string {
		const instance = Codes.getInstance();
		const value = instance.codeMap.get('too_short');

		return typeof value === 'string' ? value : CodeDefaults.TooShort;
	}

	public static tooLong(): string {
		const instance = Codes.getInstance();
		const value = instance.codeMap.get('too_long');

		return typeof value === 'string' ? value : CodeDefaults.TooLong;
	}

	public static tooBig(): string {
		const instance = Codes.getInstance();
		const value = instance.codeMap.get('too_big');

		return typeof value === 'string' ? value : CodeDefaults.TooBig;
	}

	public static tooSmall(): string {
		const instance = Codes.getInstance();
		const value = instance.codeMap.get('too_small');

		return typeof value === 'string' ? value : CodeDefaults.TooSmall;
	}

	public static badEncoding(): string {
		const instance = Codes.getInstance();
		const value = instance.codeMap.get('bad_encoding');

		return typeof value === 'string' ? value : CodeDefaults.BadEncoding;
	}

	public static reset(): void {
		const instance = Codes.getInstance();
		instance.codeMap.clear();
	}
}
