import type {TestOutcome} from './outcome';

export interface TestValue<ValueT, ResultT> {
	label: string;
	value: ValueT;
	outcome: TestOutcome;
	result?: ResultT;
}
