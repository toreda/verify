import {type SchemaFieldType} from '../type';

export function schemaFieldTypeAllowed(
	value: unknown,
	fieldType: SchemaFieldType | SchemaFieldType[]
): boolean {
	if (typeof value !== 'string') {
		return false;
	}

	if (Array.isArray(fieldType)) {
		return fieldType.includes(value);
	}
}
