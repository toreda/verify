import {Fate} from '@toreda/fate';
import {type ExecutorParams} from './executor/params';
import {type ExecutionContext} from './execution/context';
import {type Executable} from './executable';

/**
 *
 * @param params
 *
 * @category Executor
 */
export async function executor<ValueT, CollectionT extends Executable>(
	params: ExecutorParams<ValueT, CollectionT>
): Promise<Fate<ExecutionContext>> {
	const fate = new Fate<ExecutionContext>({
		data: {
			summary: {
				counts: {
					error: 0,
					fail: 0,
					skip: 0,
					success: 0
				}
			}
		}
	});

	try {
		for (const item of params.collection) {
			const result = await item.execute(params.value);
			if (result.ok()) {
				if (result.data) {
				} else {
				}
			} else {
			}
		}
	} catch (e: unknown) {}

	return fate;
}
