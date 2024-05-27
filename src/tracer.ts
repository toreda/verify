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

import {type Id, idMake, stringValue, Text, textMake, Strong, strongMake} from '@toreda/strong-types';
import {type TracerInit} from './tracer/init';
import Defaults from './defaults';
import {type Primitive} from '@toreda/types';
import {Statement} from './statement';

/**
 * Create a readable string to uniquely identify element instances based on their
 * position in the schema tree relative to the root schema.
 * @example
 * `schemaA.someObj.id`
 * `schemaA.someObj.subObj.name`
 *
 * @remark
 * Property name and parent element aren't specific enough to uniquely identify elements
 * in recursively verified schemas, which may contain multiple sub-schemas with the same
 * element names. e.g. schemaA.text and schemaA.schemaA.text would both look similar
 * without the full path.
 *
 * @category Tracer
 */
export class Tracer {
	public readonly path: string[];
	public readonly pathSeparator: string;
	public readonly targetObjName: Id;
	public readonly targetPropName: Id;
	public readonly targetPropValue: Text;
	public readonly params: Primitive[];
	public readonly value: Strong<unknown>;

	constructor(init?: TracerInit) {
		this.path = this.mkPath(init?.path);
		this.pathSeparator = stringValue(init?.pathSeparator, Defaults.Tracer.PathSeparator);
		this.targetObjName = idMake(Defaults.Tracer.TargetObjName, init?.targetObjName);
		this.targetPropName = idMake(Defaults.Tracer.TargetPropName, init?.targetPropName);
		this.params = Array.isArray(init?.params) ? init.params : [];
		this.targetPropValue = textMake(Defaults.Tracer.TargetPropValue);

		if (init?.targetPropValue !== undefined && init?.targetPropValue !== '') {
			this.targetPropValue(`${init.targetPropValue}`);
		}

		this.value = strongMake<unknown>(init?.value !== undefined ? init.value : undefined);
	}

	public current(): string {
		return this.path.join(this.pathSeparator);
	}

	public targetLabel(): string {
		if (this.targetObjName()) {
			if (this.targetPropName()) {
				if (this.targetPropValue.getNull()) {
					return `${this.targetObjName()}.${this.targetPropName()} (curr: ${this.targetPropValue()})`;
				} else {
					return `${this.targetObjName()}.${this.targetPropName()}`;
				}
			} else {
				return this.targetObjName();
			}
		} else {
			return Defaults.Tracer.TargetObjName;
		}
	}

	public valueContent(value: unknown): string {
		if (Object(value) !== value) {
			if (value === '') {
				return ` ('')`;
			} else {
				return ` (${value})`;
			}
		} else {
			return '';
		}
	}

	public explain(): string {
		const content = this.valueContent(this.value());
		return `${this.targetLabel()}${content} ${this.path.join(' ')} ${this.params.join(', ')}`;
	}

	private mkPath(parts?: string | string[]): string[] {
		if (Array.isArray(parts)) {
			return parts;
		}

		if (typeof parts === 'string') {
			return [parts];
		}

		return [];
	}

	public child(id: string): Tracer {
		if (typeof id !== 'string' || !id) {
			return this;
		}

		return new Tracer({
			path: [...this.path, id],
			params: this.params,
			pathSeparator: this.pathSeparator,
			targetObjName: this.targetObjName(),
			targetPropName: this.targetPropName(),
			targetPropValue: this.targetPropValue()
		});
	}

	public addParam(param: Primitive): void {
		this.params.push(param);
	}

	public clearTarget(): void {
		this.targetObjName.reset();
		this.targetPropName.reset();
	}

	public reset(): void {
		this.clearTarget();
		this.value.reset();
	}
}
