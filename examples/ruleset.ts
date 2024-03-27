import {Ruleset} from '../src/ruleset';
import {target} from '../src/target';

(async (): Promise<void> => {
	const ruleset = new Ruleset();

	ruleset.add(target.must.contain.oneOf(['aaa']), target.must.be.equalTo(12));

	console.debug(`execute:`);
	const result = await ruleset.execute('aaaa');
	console.debug(`RESULT: ${result.data}`);
})();
