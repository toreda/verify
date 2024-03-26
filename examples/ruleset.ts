import {Ruleset} from '../src/ruleset';
import {target} from '../src/target';

(async (): Promise<void> => {
	const ruleset = new Ruleset();

	//const statement = new Statement<string>(value);
	// ruleset.value().must

	//ruleset.statements.add(value.must.length.equalTo(1));

	//const result = await statement.execute('22');

	ruleset.add(target.must.contain.oneOf(['aaa']), target.must.be.equalTo(12));

	console.debug(`execute:`);
	const result = await ruleset.execute('aaaa');
	console.debug(`RESULT: ${result.data}`);
})();
