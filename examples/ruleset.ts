import {Ruleset} from '../src/ruleset';
import {Statement} from '../src/statement';

(async (): Promise<void> => {
	const ruleset = new Ruleset<string>();

	const statement = new Statement<string>({
		value: ''
	});

	//ruleset.statements.add(statement.has.length.equalTo(1));

	const result = await ruleset.execute('22');

	console.debug(`RESULT: ${result.data}`);
})();
