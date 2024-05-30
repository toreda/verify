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

import {type Id, idMake, stringValue, type Text, textMake, Strong, strongMake} from '@toreda/strong-types';
import {type TracerInit} from './tracer/init';
import Defaults from './defaults';
import {type Primitive} from '@toreda/types';

/**
 * Create a readable string to uniquely identify element instances based on their
 * position in the schema tree relative to the root schema.
 * @example
 * ```typescript
 * const tracer = new Tracer();
 * ```
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
	/** Character separating path elements in the current path string. */
	public readonly pathSeparator: string;
	/**
	 * @name Target Object Name
	 * @description Name of the the tracer's target object.
	 */
	public readonly targetObjName: Id;
	/**
	 * @name Target Property Name
	 * @description Name of the tracer's target property.
	 */
	public readonly targetPropName: Id;
	public readonly targetPropValue: Text;
	/** @description Parameters used in actions or to execute nodes being traced. */
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

	/**
	 *	@description Convert the tracer's current path array to a string and return.
	 */
	public current(): string {
		return this.path.join(this.pathSeparator);
	}

	/**
	 * @description Current tracer target as a readable string. Accounts for the target object, prop,
	 * and values (if set).
	 */
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

	public valueContent(input: unknown): string {
		if (Object(input) !== input) {
			if (input === '') {
				return ` ('')`;
			} else {
				return ` (${input})`;
			}
		} else {
			return '';
		}
	}

	public explain(): string {
		const content = this.valueContent(this.value());
		const params = this.params.join(', ');
		const paramsText = params !== '' ? ` ${params}` : '';

		return `${this.targetLabel()}${content} ${this.path.join(' ')}${paramsText}`;
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

	public addParam(...params: Primitive[]): void {
		this.params.push(...params);
	}

	public clearTarget(): void {
		this.targetObjName.reset();
		this.targetPropName.reset();
	}

	public reset(): void {
		this.clearTarget();
		this.value.reset();
		this.params.length = 0;
	}
}
