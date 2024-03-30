/**
 * @category Executor
 */
export interface ExecutorParams<ValueT = unknown, CollectionT = unknown> {
	value?: ValueT | null;
	collection: CollectionT[];
}
