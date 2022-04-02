import {TestSet} from '../test/set';

const NUMBERS_MISSING: TestSet<number, boolean> = {
	tests: [{label: '', value: 1, result: false, outcome: 'fail'}]
};

export default NUMBERS_MISSING;
