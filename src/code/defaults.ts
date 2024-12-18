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

/**
 * @category		Error Handling
 */
export class CodeDefaults {
	public static BadArgFormat = 'bad_arg_format' as const;
	public static BadConfig = 'bad_config' as const;
	public static BadContent = 'bad_content' as const;
	public static BadData = 'bad_data' as const;
	public static BadEncoding = 'bad_encoding' as const;
	public static BadFormat = 'bad_format' as const;
	public static EmptyArg = 'empty_arg' as const;
	public static EmptyArray = 'empty_array' as const;
	public static EmptyConfig = 'empty_config' as const;
	public static EmptyObject = 'empty_object' as const;
	public static EmptyString = 'empty_string' as const;
	public static EmptyValue = 'empty_value' as const;
	public static Error = 'error' as const;
	public static Exception = 'exception' as const;
	public static Missing = 'missing' as const;
	public static MissingArg = 'missing_arg' as const;
	public static MissingConfig = 'missing_config' as const;
	public static MissingId = 'missing_id' as const;
	public static MissingValue = 'missing_value' as const;
	public static NotAuthorized = 'not_authorized' as const;
	public static TooBig = 'too_big' as const;
	public static TooLong = 'too_long' as const;
	public static TooShort = 'too_short' as const;
	public static TooSmall = 'too_small' as const;
	public static UnknownError = 'unknown_error' as const;
	public static UnsupportedConfig = 'unsupported_config' as const;
	public static UnsupportedType = 'unsupported_type' as const;
	public static UnsupportedValue = 'unsupported_value' as const;
	public static UnsupportedVersion = 'unsupported_version' as const;
}
