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

import {Fate} from '@toreda/fate';
import {SchemaField} from './schema/field';
import {schemaError} from './schema/error';
import type {SchemaFieldType} from './schema/field/type';
import {Log} from '@toreda/log';
import {SchemaConfig} from './schema/config';
import type {SchemaInit} from './schema/init';
import {type SchemaOutputTransformer} from './schema/output/transformer';
import {type SchemaData} from './schema/data';
import {simpleOutputTransform} from './simple/output/transform';
import {isDbl, isFloat, isUrl, stringValue} from '@toreda/strong-types';
import {isUInt} from './is/uint';
import {isInt} from './is/int';
import {type SchemaFieldData} from './schema/field/data';
import {CustomTypes} from './custom/types';
import {schemaBuiltIns} from './schema/built/ins';
import {valueTypeLabel} from './value/type/label';
import {SchemaPath} from './schema/path';
import {type SchemaVerifyInit} from './schema/verify/init';
import {type SchemaVerifyValue} from './schema/verify/value';
import {type VerifiedSchema} from './verified/schema';
import {VerifiedField} from './verified/field';

/**
 * @category Schemas
 */
export class Schema<DataT, InputT extends SchemaData<DataT>, VerifiedT = InputT> {
	public readonly schemaName: string;
	public readonly fields: Map<keyof InputT, SchemaField<InputT>>;
	public readonly cfg: SchemaConfig;
	public readonly transformOutput: SchemaOutputTransformer<DataT, VerifiedT | null>;
	public readonly customTypes: CustomTypes<DataT, InputT, VerifiedT>;
	public readonly base: Log;
	public readonly parsePath: string[];

	constructor(init: SchemaInit<DataT, InputT, VerifiedT>) {
		this.schemaName = init.name;
		this.fields = this._makeFields(init.fields);
		this.cfg = new SchemaConfig(init.options);

		this.base = init.base.makeLog(`schema___${init.name}`);
		this.customTypes = new CustomTypes<DataT, InputT, VerifiedT>({
			data: init.customTypes,
			base: this.base
		});

		this.parsePath = Array.isArray(init.parentPath) ? init.parentPath : [];
		this.parsePath.push(this.schemaName);

		this.transformOutput = init.transformOutput ? init.transformOutput : simpleOutputTransform;
	}

	/**
	 * Build and set schema fields from schema init data.
	 * @param fields
	 */
	private _makeFields(fields: SchemaFieldData<InputT>[]): Map<keyof InputT, SchemaField<InputT>> {
		const result = new Map<keyof InputT, SchemaField<InputT>>();

		if (!Array.isArray(fields)) {
			return result;
		}

		for (const data of fields) {
			result.set(data.name, new SchemaField<InputT>(data));
		}

		return result;
	}

	public async verifyField(
		field: SchemaField<InputT>,
		value: unknown,
		path: SchemaPath,
		base: Log
	): Promise<Fate<VerifiedField<DataT>>> {
		const fate = new Fate<VerifiedField<DataT>>();

		if (!field) {
			return fate.setErrorCode(schemaError(`missing_field`, path.current()));
		}

		const currPath = path.child(field.name);

		if (value === undefined) {
			return fate.setErrorCode(schemaError('missing_field_value', currPath.current()));
		}

		const verified = await this.fieldSupportsValue(field, value, currPath, base);
		if (!verified.ok()) {
			return fate.setErrorCode(verified.errorCode());
		}

		fate.data = verified.data;

		return fate.setSuccess(true);
	}

	public async fieldSupportsValue(
		field: SchemaField<InputT>,
		value: unknown,
		path: SchemaPath,
		base: Log
	): Promise<Fate<VerifiedField<DataT>>> {
		const fate = new Fate<VerifiedField<DataT>>();
		if (value === null) {
			if (field.types.includes('null')) {
				return fate.setSuccess(true);
			} else {
				return fate.setErrorCode(schemaError('field_does_not_support_type:null', path.current()));
			}
		}

		for (const type of field.types) {
			if (!this.schemaSupportsType(type)) {
				return fate.setErrorCode(schemaError(`field_does_not_support_type:${type}`, path.current()));
			}

			const result = await this.verifyValue({
				fieldId: field.name,
				fieldType: type,
				value: value,
				path: path,
				base: base
			});

			if (!result.ok()) {
				return fate.setErrorCode(result.errorCode());
			}

			fate.data = result.data;
			return fate.setSuccess(true);
		}

		return fate.setErrorCode(
			schemaError(`field_does_not_support_type:${valueTypeLabel(value)}`, path.current())
		);
	}

	public isBuiltIn(type: SchemaFieldType): boolean {
		if (typeof type !== 'string') {
			return false;
		}

		return schemaBuiltIns.includes(type);
	}

	public schemaSupportsType(type: SchemaFieldType): boolean {
		if (this.isBuiltIn(type)) {
			return true;
		}

		return this.customTypes.has(type);
	}
	/**
	 * Check if `type` is supported by the schema. Doesn't check if value actually
	 * conforms to the specified type.
	 * @param type
	 * @param value
	 */
	public valueIsBuiltInType(type: SchemaFieldType, value: unknown): value is DataT {
		if (typeof type !== 'string') {
			return false;
		}

		switch (type) {
			case 'null':
				return value === null;
			case 'bigint':
				return typeof value === 'bigint';
			case 'boolean':
				return typeof value === 'boolean';
			case 'double':
				return isDbl(value as number);
			case 'dbl':
				return isDbl(value as number);
			case 'float':
				return isFloat(value as number);
			case 'int':
				return isInt(value);
			case 'number':
				return typeof value === 'number' && isFinite(value);
			case 'string':
				return typeof value === 'string';
			case 'undefined':
				return value === undefined;
			case 'uint':
				return isUInt(value);
			case 'url':
				return isUrl(value as string);
			default:
				return false;
		}
	}

	/**
	 * Check if value type matches type for primitives, and whether the content matches
	 * the expected range or format (if any).
	 * @param type
	 * @param value
	 */
	public async verifyValue(init: SchemaVerifyValue): Promise<Fate<VerifiedField<DataT>>> {
		const fate = new Fate<VerifiedField<DataT>>();

		if (this.isBuiltIn(init.fieldType)) {
			if (this.valueIsBuiltInType(init.fieldType, init.value)) {
				// TODO: Add validation here. Type match does not automatically prove valid content.
				fate.data = init.value;
				return fate.setSuccess(true);
			} else {
				return fate.setErrorCode(
					schemaError(
						`field_does_not_support_value_type:${valueTypeLabel(init.value)}`,
						init.path.current()
					)
				);
			}
		}

		if (this.customTypes.hasSchema(init.fieldType) && typeof init.value === 'object') {
			return this.customTypes.verifyOnly({
				id: init.fieldId,
				type: init.fieldType,
				data: init.value as SchemaData<DataT>,
				path: init.path,
				base: init.base,
				childSchema: true
			});
		}

		//const custom = await this.customTypes.verify(type, value, this.base);
		if (this.customTypes.hasVerifier(init.fieldType)) {
			return this.customTypes.verifyValue(init.fieldId, init.fieldType, init.value, init.base);
		}

		return fate.setErrorCode(
			schemaError(`field_does_not_support_type:${init.fieldType}`, init.path.current())
		);
	}

	public async verify(init: SchemaVerifyInit): Promise<Fate<VerifiedT | null>> {
		const fate = new Fate<VerifiedT | null>();
		if (!init) {
			return fate.setErrorCode(schemaError('missing_argument:init', this.schemaName));
		}

		const parentPath = init?.path ? init.path : new SchemaPath();
		const currPath =
			init?.childSchema === true ? parentPath : parentPath.child(stringValue(init.id, this.schemaName));

		if (!init?.base) {
			return fate.setErrorCode(
				schemaError('missing_argument:init.base', currPath.child('verify').current())
			);
		}

		init.path = currPath;
		const log = init.base.makeLog('verify');

		const verified = await this.verifyOnly(init);
		if (!verified.ok()) {
			return fate.setErrorCode(verified.errorCode());
		}

		if (!verified.data) {
			return fate.setErrorCode(
				schemaError('no_transform_data_returned', currPath.child('verify').current())
			);
		}

		try {
			const result = await this.transformOutput(verified.data, init.base);
			if (result.ok()) {
				if (result.data !== null) {
					fate.data = result.data;
					fate.setSuccess(true);
				} else {
					fate.setErrorCode(schemaError(`null_transform_output`, `${this.schemaName}:verify`));
				}
			} else {
				fate.setErrorCode(result.errorCode());
			}
		} catch (e: unknown) {
			const msg = e instanceof Error ? e.message : 'unknown_err_type';
			fate.data = null;
			fate.setErrorCode(schemaError('exception', 'schema.verify', `error: ${msg}.`));
			log.error(`Exception parsing schema: ${msg}.`);
		}

		return fate;
	}

	/**
	 * Verify provided data object's structure, content, and types against this schema.
	 * @param init
	 */
	public async verifyOnly(init: SchemaVerifyInit): Promise<Fate<VerifiedSchema<DataT>>> {
		const fate = new Fate<VerifiedSchema<DataT>>();

		const schemaName = stringValue(this.schemaName, '__missing_schemaName__');
		const currPath = init.path ? init.path : new SchemaPath();
		// Root schemas (no parent) use their schema name as the first path item. Child schemas DO NOT
		// set their own path because they have no way to know their property name in parent schema.

		if (!init.base) {
			console.error(`Missing argument: base`);
			return fate.setErrorCode(schemaError('missing_argument', currPath.current(), 'verify', 'base'));
		}

		const log = init.base.makeLog(`schema:${currPath.current()}`);

		if (init.data === undefined || init.data === null) {
			log.error(`Missing argument: data`);
			return fate.setErrorCode(
				schemaError('missing_schema_data', currPath.current(), 'verify', 'init.data')
			);
		}

		if (Object.keys(init.data)?.length === 0) {
			return fate.setErrorCode(schemaError('empty_schema_object', currPath.current(), 'verify'));
		}

		if (!this.transformOutput) {
			log.error(`Missing argument: transformOutput`);
			return fate.setErrorCode(schemaError('missing_argument', currPath.current(), 'transformOutput'));
		}

		if (typeof this.transformOutput !== 'function') {
			log.error(`Non-function argument: transformOutput`);
			return fate.setErrorCode(
				schemaError('nonfunction_argument', currPath.current(), 'transformOutput')
			);
		}

		const total = this.fields.size;
		let processed = 0;

		const mapped: VerifiedSchema<DataT> = new Map<string, DataT | VerifiedSchema<DataT> | null>();

		for (const [id, field] of this.fields.entries()) {
			const name = id.toString();
			const verified = await this.verifyField(field, init.data[name], currPath, init.base);

			if (!verified.ok()) {
				return fate.setErrorCode(verified.errorCode());
			}

			processed++;
			mapped.set(name, verified.data);
		}

		if (total >= processed) {
			fate.data = mapped;
			fate.setSuccess(true);
		} else {
			log.error(`schema_field_mismatch: schema.verify - expected '${total}' but got ${processed}`);
			fate.setErrorCode(
				schemaError(
					`schema_field_mismatch`,
					'schema.verify',
					`expected:${total}`,
					`processed:${processed}`
				)
			);
			fate.data = null;
		}

		return fate;
	}
}
