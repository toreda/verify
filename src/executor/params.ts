import {type ExecutorFlags} from './flags';

/**
 * @category Executor
 */
export interface ExecutorParams<ValueT = unknown, CollectionT = unknown> {
	value?: ValueT | null;
	name: string;
	collection: CollectionT[];
	flags?: ExecutorFlags;
}
