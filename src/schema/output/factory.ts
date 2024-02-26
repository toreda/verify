import {Fate} from '@toreda/fate';
import {Log} from '@toreda/log';

/**
 * @category Schemas
 */
export type SchemaOutputFactory<OutputT> = (
	data: Map<string, unknown>,
	base: Log
) => Promise<Fate<OutputT | null>>;
