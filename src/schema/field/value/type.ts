import {SchemaFieldType} from "../type";

export interface SchemaValueType<DataT = unknown> {
	allowUndefined: boolean;
	allowArray: boolean;
	type: SchemaFieldType<DataT>;
}

export function schemaFieldValueType<DataT>(type?: string): SchemaValueType<DataT> | null{
	if (typeof type !== 'string') {
		return null;
	}

	if (type.trim() === '') {
		return null;
	}

	const result: SchemaValueType<DataT> = {
		allowUndefined: false,
		allowArray: false,
		type: 'none'
	};

	let value = type;

	if (type.endsWith('?')) {
		value = value.slice(0, -1);
		result.allowUndefined = true;
	}

	if (type.endsWith('[]')) {
		value = value.slice(0, -2);
		result.allowArray = true;
	}

	result.type = value;

	return result;
}
