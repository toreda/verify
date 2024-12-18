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

import {type Primitive} from '@toreda/types';

/**
 * Tracer Init
 *
 * Optional arguments during Trace Path creation.
 *
 * @category Tracer
 */
export interface TracerInit {
	path?: string | string[];
	/**
	 * Path Separator
	 *
	 * (Optional) character used to join path elements when getting a
	 * tracer path. Uses default separator when not set. Only set if you need to
	 * override the default.
	 * @remarks
	 * See `defaults.ts` for the default tracer path separator.
	 */
	pathSeparator?: string;
	targetPropName?: string;
	targetObjName?: string;
	targetPropValue?: number | string | boolean | null;
	params?: Primitive[];
	value?: unknown;
}
