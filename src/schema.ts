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
import type {SchemaField} from './schema/field';
import {schemaError} from './schema/error';
import type {SchemaFieldType} from './schema/field/type';
import {Log} from '@toreda/log';
import {isBoolean} from './is/boolean';
import {isString} from './is/string';
import {SchemaConfig} from './schema/config';
import type {SchemaInit} from './schema/init';
import {type SchemaOutputTransformer} from './schema/output/transformer';
import {type SchemaData} from './schema/data';
import {schemaSimpleOutput} from './schema/simple/output';
import {isDbl, isFloat, isUrl} from '@toreda/strong-types';
import {isUInt} from './is/uint';
import {isInt} from './is/int';

/**
 * @category Schemas
 */
export class Schema<DataT, InputT extends SchemaData<DataT>, VerifiedT = InputT> {
	public readonly schemaName: string;
	public readonly fields: Map<keyof InputT, SchemaField<InputT>>;
	public readonly cfg: SchemaConfig;
	public readonly factory: SchemaOutputTransformer<DataT, VerifiedT>;

	constructor(init: SchemaInit<DataT, InputT, VerifiedT>) {
		this.schemaName = init.name;
		this.fields = this.makeFields(init.fields);
		this.cfg = new SchemaConfig(init.options);
		this.factory = init.factory ? init.factory : schemaSimpleOutput;
	}

	private makeFields(fields: SchemaField<InputT>[]): Map<keyof InputT, SchemaField<InputT>> {
		const result = new Map<keyof InputT, SchemaField<InputT>>();

		if (!Array.isArray(fields)) {
			return result;
		}

		for (const field of fields) {
			result.set(field.name, field);
		}

		return result;
	}

	public async verifyField(name: string, field: SchemaField<InputT>, value: unknown): Promise<Fate<never>> {
		const fate = new Fate<never>();
		if (!field) {
			return fate.setErrorCode(schemaError(`missing_record_field`, this.schemaName, name));
		}

		if (typeof value === 'undefined') {
			return fate.setErrorCode(schemaError('missing_field_value', this.schemaName, name));
		}

		if (value === null) {
			if (field?.nullable === true) {
				return fate.setSuccess(true);
			} else {
				return fate.setErrorCode(schemaError('null_field_value_disallowed', this.schemaName, name));
			}
		}

		const valid = await this.verifyValues(field.types, value);
		if (!valid.success()) {
			return fate.setErrorCode(schemaError(valid.errorCode(), 'verifyField', name));
		}

		return fate.setSuccess(true);
	}

	public async verifyValues(
		types: SchemaFieldType | SchemaFieldType[],
		value: unknown
	): Promise<Fate<never>> {
		const fate = new Fate<never>();

		if (Array.isArray(types)) {
			let matches = 0;
			for (const type of types) {
				const result = await this.verifyValue(type, value);
				if (result.success()) {
					matches++;
				}
			}

			return fate.setSuccess(matches > 0);
		} else {
			return this.verifyValue(types, value);
		}
	}

	public async verifyValue(type: SchemaFieldType, value: unknown): Promise<Fate<never>> {
		const fate = new Fate<never>();

		switch (type) {
			case 'null':
				return fate.setSuccess(value === null);
			case 'bigint':
				return fate.setSuccess(typeof value === 'bigint');
			case 'boolean':
				return fate.setSuccess(isBoolean(value));
			case 'double':
				return fate.setSuccess(isDbl(value as number));
			case 'dbl':
				return fate.setSuccess(isDbl(value as number));
			case 'float':
				return fate.setSuccess(isFloat(value as number));
			case 'int':
				return fate.setSuccess(isInt(value));
			case 'number':
				return fate.setSuccess(typeof value === 'number' && isFinite(value));
			case 'string':
				return fate.setSuccess(isString(value));
			case 'undefined':
				return fate.setSuccess(value === undefined);
			case 'uint':
				return fate.setSuccess(isUInt(value));
			case 'url':
				return fate.setSuccess(isUrl(value as string));
			default:
				return fate.setErrorCode(`unsupported_type:${type?.toString()}`);
		}
	}

	public async verify(data: SchemaData<DataT>, base: Log): Promise<Fate<VerifiedT | null>> {
		const fate = new Fate<VerifiedT | null>();

		if (!base) {
			console.error(`Missing argument: base`);
			return fate.setErrorCode(schemaError('missing_argument', 'schema.verify', 'base'));
		}

		const log = base.makeLog(`schema:${this.schemaName}.verify`);

		if (!data) {
			log.error(`Missing argument: data`);
			return fate.setErrorCode(schemaError('missing_argument', 'schema.verify', 'data'));
		}

		if (!this.factory) {
			log.error(`Missing argument: factory`);
			return fate.setErrorCode(schemaError('missing_argument', 'schema.verify', 'factory'));
		}

		if (typeof this.factory !== 'function') {
			log.error(`Non-function argument: factory`);
			return fate.setErrorCode(schemaError('nonfunction_argument', 'schema.verify', 'factory'));
		}

		const total = this.fields.size;
		let processed = 0;

		const mapped = new Map<string, DataT>();

		for (const [id, field] of this.fields.entries()) {
			const name = id.toString();
			const valid = await this.verifyField(name, field, data[name]);

			if (!valid.success()) {
				return fate.setErrorCode(valid.errorCode());
			}

			processed++;
			mapped.set(name, data[name]);
		}

		if (total >= processed) {
			try {
				const result = await this.factory(mapped, log);
				if (result.ok()) {
					fate.data = result.data;
					fate.setSuccess(true);
				} else {
					fate.setErrorCode(result.errorCode());
				}
			} catch (e: unknown) {
				const msg = e instanceof Error ? e.message : 'unknown_err_type';
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
