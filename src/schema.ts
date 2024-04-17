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
import {type SchemaFieldData} from './schema/field/data';

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

	private makeFields(fields: SchemaFieldData<InputT>[]): Map<keyof InputT, SchemaField<InputT>> {
		const result = new Map<keyof InputT, SchemaField<InputT>>();

		if (!Array.isArray(fields)) {
			return result;
		}

		for (const data of fields) {
			result.set(data.name, new SchemaField<InputT>(data));
		}

		return result;
	}

	public async verifyField(name: string, field: SchemaField<InputT>, value: unknown): Promise<Fate<never>> {
		const fate = new Fate<never>();
		if (!field) {
			return fate.setErrorCode(
				schemaError(`missing_field`, `${this.schemaName}.verifyField`, `${name}`)
			);
		}

		if (value === undefined) {
			return fate.setErrorCode(
				schemaError('missing_field_value', `${this.schemaName}.verifyField`, `${name}`)
			);
		}

		const valid = await this.verifyFieldType(field.types, value);
		if (!valid.ok()) {
			return fate.setErrorCode(schemaError(valid.errorCode(), `${this.schemaName}.verifyField`, name));
		}

		return fate.setSuccess(true);
	}

	public async verifyFieldType(types: SchemaFieldType[], value: unknown): Promise<Fate<never>> {
		const fate = new Fate<never>();

		if (!types.includes('null') && value === null) {
			return fate.setErrorCode('null_value_disallowed');
		}

		let matches = 0;
		for (const type of types) {
			const result = await this.verifyValue(type, value);
			if (!result.ok()) {
				return fate.setErrorCode(result.errorCode());
			}

			if (result.data === true) {
				matches++;
			}
		}

		if (matches > 0) {
			return fate.setSuccess(true);
		} else {
			return fate.setErrorCode(`field_type_mismatch:${typeof value}`);
		}
	}

	public async verifyValue(type: SchemaFieldType, value: unknown): Promise<Fate<boolean>> {
		const fate = new Fate<boolean>();

		switch (type) {
			case 'null':
				fate.data = value === null;
				break;
			case 'bigint':
				fate.data = typeof value === 'bigint';
				break;
			case 'boolean':
				fate.data = isBoolean(value);
				break;
			case 'double':
				fate.data = isDbl(value as number);
				break;
			case 'dbl':
				fate.data = isDbl(value as number);
				break;
			case 'float':
				fate.data = isFloat(value as number);
				break;
			case 'int':
				fate.data = isInt(value);
				break;
			case 'number':
				fate.data = typeof value === 'number' && isFinite(value);
				break;
			case 'string':
				fate.data = isString(value);
				break;
			case 'undefined':
				fate.data = value === undefined;
				break;
			case 'uint':
				fate.data = isUInt(value);
				break;
			case 'url':
				fate.data = isUrl(value as string);
				break;
			default:
				fate.data = false;
				fate.setErrorCode(`unsupported_type:${type?.toString()}`);
				break;
		}

		if (!fate.errorCode()) {
			return fate.setSuccess(true);
		} else {
			return fate;
		}
	}

	public async verify(data: SchemaData<DataT>, base: Log): Promise<Fate<VerifiedT | null>> {
		const fate = new Fate<VerifiedT | null>();

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

		if (!this.factory) {
			log.error(`Missing argument: factory`);
			return fate.setErrorCode(schemaError('missing_argument', fnPath, 'factory'));
		}

		if (typeof this.factory !== 'function') {
			log.error(`Non-function argument: factory`);
			return fate.setErrorCode(schemaError('nonfunction_argument', fnPath, 'factory'));
		}

		const total = this.fields.size;
		let processed = 0;

		const mapped = new Map<string, DataT>();

		for (const [id, field] of this.fields.entries()) {
			const name = id.toString();
			const valid = await this.verifyField(field.name.toString(), field, data[name]);

			if (!valid.ok()) {
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
