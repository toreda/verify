import {SchemaFieldType} from "../type";

export interface SchemaValueType<DataT = unknown> {
	allowUndefined: boolean;
	allowArray: boolean;
	typeId: SchemaFieldType<DataT>;
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
		typeId: 'none'
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

	// TODO: Add typecheck here.
	result.typeId = value as any;

	return result;
}
