import type {TestValues} from './values';

export interface TestSet<ValueT, ResultT> {
	labelPrefix?: string;
	tests: TestValues<ValueT, ResultT>;
}
