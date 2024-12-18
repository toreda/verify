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

import {Tracer} from '../../tracer';
import {BlockModType} from '../mod/type';
import {type BlockType} from '../type';

/**
 * Parameters used by rule blocks to intialize it their base block data.
 *
 * @category Rule Block
 *
 * @remarks
 * Normally two types with overlap like `BlockInit` and `BlockBaseInit` would
 * be combined into a single type, or one would extend the other and add properties. Here they should
 * remain separate types due to complications of using the `InputT` needed by `BlockInit<InputT>` in the
 * base block extended by all blocks. `BlockBaseInit` doesn't need `InputT`.
 *
 */
export interface BlockBaseInit {
	name: string;
	blockType: BlockType;
	modType?: BlockModType;
	tracer: Tracer;
}
