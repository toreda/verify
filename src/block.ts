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

import {type BlockBaseInit} from './block/base/init';
import {type BlockModType} from './block/mod/type';
import type {BlockType} from './block/type';
import {Tracer} from './tracer';

/**
 * Block<StatementT>
 *
 * Base type for rule blocks.
 * @typeParam 		StatementT - Type for statement holding or that will hold this block.
 *
 * @category Rule Blocks
 */
export abstract class Block<StatementT = unknown> {
	/**
	 * Block Type
	 */
	public readonly blockType: BlockType;
	/**
	 * Statement Container
	 */
	public readonly stmt: StatementT;
	public readonly tracer: Tracer;
	public readonly name: string;
	/**
	 * Modifier Type
	 *
	 * Modifier type applied to block output (if any).
	 *
	 * @defaultValue false
	 * @remarks "not" blocks invert block output.
	 */
	public readonly modType: BlockModType;

	constructor(init: BlockBaseInit, stmt: StatementT) {
		this.blockType = init.blockType;
		this.stmt = stmt;
		this.name = init.name;
		this.modType = init.modType !== undefined ? init.modType : 'none';
		this.tracer = init.tracer.child(init.name);
	}
}
