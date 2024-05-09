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
import {isDbl, isFloat, isUrl} from '@toreda/strong-types';
import {isUInt} from './is/uint';
import {isInt} from './is/int';
import {type SchemaFieldData} from './schema/field/data';
import {CustomTypes} from './custom/types';
import {schemaBuiltIns} from './schema/built/ins';

/**
 * @category Schemas
 */
export class Schema<DataT, InputT extends SchemaData<DataT>, VerifiedT = InputT> {
	public readonly schemaName: string;
	public readonly fields: Map<keyof InputT, SchemaField<InputT>>;
	public readonly cfg: SchemaConfig;
	public readonly outputTransform: SchemaOutputTransformer<DataT, VerifiedT | null>;
	public readonly customTypes: CustomTypes<DataT, InputT, VerifiedT>;
	public readonly base: Log;

	constructor(init: SchemaInit<DataT | null, InputT, VerifiedT>) {
		this.schemaName = init.name;
		this.fields = this._makeFields(init.fields);
		this.cfg = new SchemaConfig(init.options);

		this.base = init.base.makeLog(`schema___${init.name}`);
		this.customTypes = new CustomTypes<DataT, InputT, VerifiedT>({
			data: init.customTypes,
			base: this.base
		});
		this.outputTransform = init.outputTransform ? init.outputTransform : simpleOutputTransform;
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
		name: string,
		field: SchemaField<InputT>,
		value: unknown
	): Promise<Fate<DataT | SchemaData<unknown> | null>> {
		const fate = new Fate<DataT | SchemaData<unknown> | null>();

		if (!field) {
			return fate.setErrorCode(schemaError(`missing_field`, `${this.schemaName}.${name}`));
		}

		if (value === undefined) {
			return fate.setErrorCode(schemaError('missing_field_value', `${this.schemaName}.${name}`));
		}

		const verified = await this.fieldSupportsValue(field, value);
		if (!verified.ok()) {
			return fate.setErrorCode(verified.errorCode());
		}

		fate.data = verified.data;

		return fate.setSuccess(true);
	}

	public async fieldSupportsValue(
		field: SchemaField<InputT>,
		value: unknown
	): Promise<Fate<DataT | SchemaData<unknown>>> {
		const fate = new Fate<DataT | SchemaData<unknown>>();

		if (value === null && !field.types.includes('null')) {
			return fate.setErrorCode(
				schemaError('unsupported_type:null', `${this.schemaName}.${field.name}`)
			);
		}

		for (const type of field.types) {
			if (!this.schemaSupportsType(type)) {
				return fate.setErrorCode(
					schemaError(`unsupported_schema_type:${type}`, `${this.schemaName}.${field.name}`)
				);
			}

			const result = await this.verifyValue(type, value);

			if (result.ok() === true) {
				fate.data = result.data;
				return fate.setSuccess(true);
			}
		}

		return fate.setErrorCode(
			schemaError(`unsupported_type:${typeof value}`, `${this.schemaName}.${field.name}`)
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
	 * Check if `type` is supported by the schema. Doesn't check if value actuallyz
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
	 * Check if value's content matches `type`. Some types are primitives verified by type checks.
	 * Others require more in depth validation, like URLs or Schema Data.
	 * @param type
	 * @param value
	 */
	public async verifyValue(
		type: SchemaFieldType,
		value: unknown | SchemaData<unknown>
	): Promise<Fate<DataT | SchemaData<unknown>>> {
		const fate = new Fate<DataT | SchemaData<unknown>>();

		if (this.valueIsBuiltInType(type, value)) {
			// TODO: Add validation here. Type match does not automatically prove valid content.
			fate.data = value;
			return fate.setSuccess(true);
		}

		if (!this.customTypes.has(type)) {
			return fate.setErrorCode(
				schemaError(`unsupported_type:${typeof value}`, `${this.schemaName}.verifyValue`)
			);
		}

		if (this.customTypes.hasSchema(type)) {
			return this.customTypes.verifySchema(type, value);
		}

		//const custom = await this.customTypes.verify(type, value, this.base);
		if (this.customTypes.hasVerifier(type)) {
			return this.customTypes.verifyValue(type, value);
		}

		return fate.setErrorCode(`field_cant_verify_custom_type:${type?.toString()}`);
	}

	public async verify(data: SchemaData<DataT>, base: Log): Promise<Fate<VerifiedT>> {
		const fate = new Fate<VerifiedT>();

		const fnPath = `${this.schemaName}.verify`;

		if (!base) {
			console.error(`Missing argument: base`);
			return fate.setErrorCode(schemaError('missing_argument', fnPath, 'base'));
		}

		const log = base.makeLog(`schema:${fnPath}`);

		if (data === undefined || data === null) {
			log.error(`Missing argument: data`);
			return fate.setErrorCode(schemaError('missing_schema_data', fnPath));
		}

		if (Object.keys(data)?.length === 0) {
			return fate.setErrorCode(schemaError('empty_schema_object', fnPath));
		}

		if (!this.outputTransform) {
			log.error(`Missing argument: outputTransform`);
			return fate.setErrorCode(schemaError('missing_argument', fnPath, 'outputTransform'));
		}

		if (typeof this.outputTransform !== 'function') {
			log.error(`Non-function argument: outputTransform`);
			return fate.setErrorCode(schemaError('nonfunction_argument', fnPath, 'outputTransform'));
		}

		const total = this.fields.size;
		let processed = 0;

		const mapped = new Map<string, DataT | SchemaData<unknown> | null>();

		for (const [id, field] of this.fields.entries()) {
			const name = id.toString();
			const verified = await this.verifyField(name, field, data[name]);

			if (!verified.ok()) {
				return fate.setErrorCode(verified.errorCode());
			}

			processed++;
			mapped.set(name, verified.data);
		}

		if (total >= processed) {
			try {
				const result = await this.outputTransform(mapped, log);
				if (result.ok()) {
					if (result.data !== null) {
						fate.data = result.data;
						fate.setSuccess(true);
					} else {
						fate.setErrorCode(schemaError(`null_transform_output`, `${this.schemaName}.verify`));
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
