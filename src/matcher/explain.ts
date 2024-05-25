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

import {stringValue} from '@toreda/strong-types';
import {type MatcherExplainData} from './explain/data';

/**
 * @category Matcher Predicates
 */
export class MatcherExplain<InputT = unknown> {
	public readonly fnLabel: string;
	public readonly params: InputT[];
	public readonly targetLabel: string;

	constructor(data: MatcherExplainData) {
		this.fnLabel = stringValue(data.fnLabel, '__unknown__');
		this.params = [];
		this.targetLabel = this._mkTargetLabel(data);
	}

	public _mkTargetLabel(data: MatcherExplainData): string {
		const objName = stringValue(data.targetObjName, 'value');
		const propName = stringValue(data.targetPropName, '');

		if (propName !== '') {
			return `${objName}.${propName}`;
		} else {
			return `${objName}`;
		}
	}

	public asText(): string {
		return `${this.targetLabel} ${this.fnLabel} ${this.paramsText()}`;
	}

	public addParam(value: InputT): void {
		this.params.push(value);
	}

	public paramsText(): string {
		return this.params.join(', ');
	}
}
