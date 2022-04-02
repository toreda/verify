import type {TestLabelOptions} from './options';
import type {TestValue} from '../value';

export async function testLabelMk<ValueT, ResultT>(
	test: TestValue<ValueT, ResultT>,
	options?: TestLabelOptions
): Promise<string | null> {
	if (!test) {
		return null;
	}


}
