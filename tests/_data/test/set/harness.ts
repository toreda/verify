import type {TestSet} from '../set';

export class TestSetHarness<ValueT, ResultT> {
	public async run(set: TestSet<ValueT, ResultT>): Promise<void> {
		if (!set) {
			return;
		}


	}
}
