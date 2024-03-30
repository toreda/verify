import {Fate} from '@toreda/fate';
import {type ExecutionContext} from './execution/context';

/**
 * Implemented by executor classes.
 *
 * @category Executor
 */
export interface Executable {
	execute<ValueT = unknown>(value?: ValueT | null): Promise<Fate<ExecutionContext>>;
}
