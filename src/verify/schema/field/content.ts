import {isDbl, isFloat, isUrl} from '@toreda/strong-types';
import {isUInt} from '../../../is/uint';
import {type Time} from '@toreda/time';
import {isIterable} from '../../../is/iterable';
import {isInt} from '../../../is/int';
import {SchemaFieldType} from '../../../schema/field/type';

/**
 * Determines if type name is a built-in schema type. Used to check if
 * declared field types are supported before performing actual validation.
 *
 * @param type
 * @param value
 */
export function verifySchemaFieldContent<DataT = unknown>(type: SchemaFieldType<DataT>, value: unknown): value is DataT {
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
		case 'iterable':
			return isIterable(value);
		case 'number':
			return typeof value === 'number' && isFinite(value);
		case 'string':
			return typeof value === 'string';
		case 'time':
			return (value as Time)?.type === 'time';
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
