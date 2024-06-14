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
import {transformVerified} from './transform/verified';
import {isDbl, isFloat, isUrl, numberNullValue, numberValue, stringValue} from '@toreda/strong-types';
import {isUInt} from './is/uint';
import {isInt} from './is/int';
import {type SchemaFieldData} from './schema/field/data';
import {CustomTypes} from './custom/types';
import {builtinTypes} from './builtin/types';
import {valueTypeLabel} from './value/type/label';
import {Tracer} from './tracer';
import {type SchemaVerifyInit} from './schema/verify/init';
import {type SchemaVerifyField} from './schema/verify/field';
import {type VerifiedSchemaField} from './verified/schema/field';
import {type VerifiedSchema} from './verified/schema';
import {isSchemaDataObject} from './is/schema/data/object';

/**
 * @category Schema
 */
export class Schema<DataT, InputT extends SchemaData<DataT>, TransformedT = InputT> {
	public readonly schemaName: string;
	public readonly fields: Map<keyof InputT, SchemaField<InputT>>;
	public readonly cfg: SchemaConfig;
	public readonly transformOutput: SchemaOutputTransformer<DataT, TransformedT | null>;
	public readonly customTypes: CustomTypes<DataT, InputT, TransformedT>;
	public readonly base: Log;

	constructor(init: SchemaInit<DataT, InputT, TransformedT>) {
		this.schemaName = init.name;
		this.fields = this._makeFields(init.fields);
		this.cfg = new SchemaConfig(init.options);

		this.base = init.base.makeLog(`schema___${init.name}`);
		this.customTypes = new CustomTypes<DataT, InputT, TransformedT>({
			data: init.customTypes,
			base: this.base
		});

		this.transformOutput = init.transformOutput ? init.transformOutput : transformVerified;
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
		value: DataT | DataT[] | SchemaData<DataT> | SchemaData<DataT>[] | null,
		tracer: Tracer,
		base: Log
	): Promise<Fate<VerifiedSchemaField<DataT>>> {
		const fate = new Fate<VerifiedSchemaField<DataT>>();

		if (!field) {
			return fate.setErrorCode(schemaError(`missing_field`, tracer.current()));
		}

		const currPath = tracer.child(field.name);

		if (value === undefined) {
			return fate.setErrorCode(schemaError('missing_field_value', currPath.current()));
		}

		let verified: Fate<VerifiedSchemaField<DataT>>;

		if (Array.isArray(value)) {
			verified = await this.verifyFieldValues(field, value, currPath, base);
		} else {
			// If the field is not an array, let the single field value verifier handle it.
			verified = await this.verifyFieldValue(field, value, tracer.child(field.name), base);
		}

		if (!verified.ok()) {
			return fate.setErrorCode(verified.errorCode());
		}

		if (field.ruleset.size() > 0) {
			// HACK: Fix as any hhere. Use of both generics InputT and DataT conflict here berween
			// the field value and field itself. However, value is verified according to rules and
			// matches stated type if rule check succeeds.
			const result = await field.ruleset.verify(value as any, {
				valueLabel: currPath.current()
			});

			if (!result.ok()) {
				return fate.setErrorCode(schemaError(result.errorCode(), currPath.current()));
			}

			const ctx = result.data;

			if (ctx?.outcome !== 'pass') {
				return fate.setErrorCode(`fail | [${ctx?.failedMatchers.join(',')}]`);
			}
		}

		fate.data = verified.data;

		return fate.setSuccess(true);
	}

	public async verifyFieldValues(
		field: SchemaField<InputT>,
		values: DataT[] | SchemaData<DataT>[],
		tracer: Tracer,
		base: Log
	): Promise<Fate<VerifiedSchemaField<DataT>>> {
		const fate = new Fate<VerifiedSchemaField<DataT>>({
			data: []
		});

		const data: DataT[] & VerifiedSchemaField<DataT>[] = [];
		let i = 0;
		for (const value of values) {
			const result = await this.verifyFieldValue(
				field,
				value,
				tracer.child(`${field.name}[${i}]`),
				base
			);
			i++;

			if (result.ok()) {
				data.push(result.data);
			}
		}

		fate.data = data;
		return fate.setSuccess(true);
	}

	public async verifyFieldValue(
		field: SchemaField<InputT>,
		value: DataT | SchemaData<DataT> | null,
		tracer: Tracer,
		base: Log
	): Promise<Fate<VerifiedSchemaField<DataT>>> {
		const fate = new Fate<VerifiedSchemaField<DataT>>();

		if (value === null) {
			if (field.types.includes('null')) {
				return fate.setSuccess(true);
			} else {
				return fate.setErrorCode(schemaError('field_does_not_support_type:null', tracer.current()));
			}
		}

		for (const type of field.types) {
			const baseType = (type.endsWith('[]') ? type.slice(0, -2) : type) as SchemaFieldType<DataT>;
			if (!this.schemaSupportsType(baseType)) {
				return fate.setErrorCode(
					schemaError(`schema_does_not_support_type:${baseType}`, tracer.current())
				);
			}

			const result = await this.verifyValue({
				fieldId: field.name,
				fieldType: baseType,
				data: value,
				tracer: tracer,
				base: base
			});

			if (!result.ok()) {
				return fate.setErrorCode(result.errorCode());
			}

			fate.data = result.data;
			return fate.setSuccess(true);
		}

		return fate.setErrorCode(
			schemaError(`field_does_not_support_type:${valueTypeLabel(value)}`, tracer.current())
		);
	}

	public isBuiltIn(type: SchemaFieldType<DataT>): boolean {
		return builtinTypes<DataT>().includes(type);
	}

	public schemaSupportsType(type: SchemaFieldType<DataT>): boolean {
		if (typeof type !== 'string' || !type) {
			return false;
		}

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
	public valueIsBuiltinType(type: SchemaFieldType<DataT>, value: unknown): value is DataT {
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
	 */
	public async verifyValue(init: SchemaVerifyField<DataT>): Promise<Fate<VerifiedSchemaField<DataT>>> {
		const fate = new Fate<VerifiedSchemaField<DataT>>();

		if (this.isBuiltIn(init.fieldType)) {
			if (this.valueIsBuiltinType(init.fieldType, init.data)) {
				// TODO: Add validation here. Type match does not automatically prove valid content.
				fate.data = init.data;
				return fate.setSuccess(true);
			} else {
				return fate.setErrorCode(
					schemaError(
						`field_does_not_support_value_type:${valueTypeLabel(init.data)}`,
						init.tracer.current()
					)
				);
			}
		}

		if (!isSchemaDataObject<DataT>(init.data)) {
			return fate.setErrorCode(
				schemaError('value_not_schema_data', init.tracer.current(), `${valueTypeLabel(init.data)}`)
			);
		}

		const baseType = init.fieldType.endsWith('[]') ? init.fieldType.substring(0, -2) : init.fieldType;
		if (this.customTypes.hasSchema(init.fieldType) && typeof init.data === 'object') {
			return this.customTypes.verify({
				id: init.fieldId,
				typeId: baseType,
				data: init.data,
				tracer: init.tracer,
				base: init.base,
				childSchema: true
			});
		}

		if (this.customTypes.hasVerifier(init.fieldType)) {
			return this.customTypes.verifyValue(init.fieldId, baseType, init.data, init.base);
		}

		return fate.setErrorCode(
			schemaError(`field_does_not_support_type:${baseType}`, init.tracer.current())
		);
	}

	public async verifyAndTransform(init: SchemaVerifyInit<DataT>): Promise<Fate<TransformedT | null>> {
		const fate = new Fate<TransformedT | null>();

		if (!init) {
			return fate.setErrorCode(schemaError('missing_argument:init', this.schemaName));
		}

		const parentPath = init?.tracer ? init.tracer : new Tracer();
		const currPath =
			init?.childSchema === true ? parentPath : parentPath.child(stringValue(init.id, this.schemaName));

		if (!init?.base) {
			return fate.setErrorCode(
				schemaError('missing_argument:init.base', currPath.child('verify').current())
			);
		}

		init.tracer = currPath;
		const log = init.base.makeLog('verify');

		if (!this.transformOutput) {
			return fate.setErrorCode(schemaError('missing_argument', currPath.current(), 'transformOutput'));
		}

		if (typeof this.transformOutput !== 'function') {
			return fate.setErrorCode(
				schemaError('nonfunction_argument', currPath.current(), 'transformOutput')
			);
		}

		// Verify input and return result without transform.
		const verified = await this.verify(init);
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
				fate.setErrorCode(`${result.errorCode()}`);
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
	public async verify(init: SchemaVerifyInit<DataT>): Promise<Fate<VerifiedSchema<DataT>>> {
		const fate = new Fate<VerifiedSchema<DataT>>();

		const currPath = init.tracer ? init.tracer : new Tracer();
		// Root schemas (no parent) use their schema name as the first path item. Child schemas DO NOT
		// set their own path because they have no way to know their property name in parent schema.

		if (!init.base) {
			return fate.setErrorCode(schemaError('missing_argument', currPath.current(), 'verify', 'base'));
		}

		const log = init.base.makeLog(`schema:${currPath.current()}`);

		if (init.data === undefined || init.data === null) {
			return fate.setErrorCode(
				schemaError('missing_schema_data', currPath.current(), 'verify', 'init.data')
			);
		}

		if (!isSchemaDataObject<DataT>(init.data)) {
			return fate.setErrorCode(
				schemaError('data_not_schema_data_object', currPath.current(), 'verify', 'init.data')
			);
		}

		if (Object.keys(init.data)?.length === 0) {
			return fate.setErrorCode(schemaError('empty_schema_object', currPath.current(), 'verify'));
		}

		const total = this.fields.size;
		let processed = 0;
		const fieldCount = this.fields.size;
		const mapped = new Map<string, VerifiedSchemaField<DataT>>();

		if (fieldCount === 0) {
			if (init?.flags?.allowEmptyInputObject !== true) {
				return fate.setErrorCode(schemaError('no_schema_fields', currPath.current(), 'verify'));
			}
		} else {
			const minFields = numberValue(init?.flags?.minFieldCount, 1);
			if (fieldCount < minFields) {
				return fate.setErrorCode(
					schemaError(
						`field_count_${fieldCount}_below_min_${minFields}`,
						currPath.current(),
						'verify'
					)
				);
			}
		}

		const maxFields = numberNullValue(init?.flags?.maxFieldCount, null);
		if (maxFields !== null && fieldCount > maxFields) {
			return fate.setErrorCode(
				schemaError(
					`field_count_${fieldCount}_exceeds_max_${maxFields}`,
					currPath.current(),
					'verify'
				)
			);
		}

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
