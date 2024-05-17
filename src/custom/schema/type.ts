import {Schema} from '../../schema';
import {type SchemaData} from '../../schema/data';

export type CustomSchemaType<DataT, InputT extends SchemaData<DataT>, VerifiedT> = Schema<
	DataT,
	InputT,
	VerifiedT
>;
