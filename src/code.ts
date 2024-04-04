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

/**
 * @category Error Handling
 */
export type Code<CustomT = string> =
	| 'bad_arg_format'
	| 'bad_config'
	| 'bad_content'
	| 'bad_data'
	| 'bad_encoding'
	| 'bad_format'
	| 'empty_arg'
	| 'empty_array'
	| 'empty_config'
	| 'empty_object'
	| 'empty_string'
	| 'empty_value'
	| 'error'
	| 'exception'
	| 'missing_arg'
	| 'missing_argument'
	| 'missing_config'
	| 'missing_id'
	| 'missing_property'
	| 'missing_value'
	| 'missing'
	| 'not_authorized'
	| 'too_big'
	| 'too_long'
	| 'too_short'
	| 'too_small'
	| 'unknown_error'
	| 'unsupported_config'
	| 'unsupported_type'
	| 'unsupported_value'
	| 'unsupported_version'
	| CustomT;
