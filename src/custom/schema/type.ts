import {Schema} from '../../schema';
import {type SchemaData} from '../../schema/data';

/**
 * @category 		Schema – Custom Type
 */
export type CustomSchemaType<DataT, InputT extends SchemaData<DataT>, VerifiedT> = Schema<
	DataT,
	InputT,
	VerifiedT
>;
