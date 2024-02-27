import {Fate} from '@toreda/fate';
import {Log} from '@toreda/log';

/**
 * @category Schemas
 */
export type SchemaOutputFactory<DataT, OutputT> = (
	data: Map<string, DataT>,
	base: Log
) => Promise<Fate<OutputT | null>>;
