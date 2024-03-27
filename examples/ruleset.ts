import {Ruleset} from '../src/ruleset';
import {target} from '../src/target';

(async (): Promise<void> => {
	const ruleset = new Ruleset();

	ruleset.add(target.must.contain.oneOf(['aaa']), target.must.be.equalTo(12), target.must.equal(14));

	console.debug(`Rules: ${ruleset.rules.length}`);

	for (const rule of ruleset.rules) {
		console.debug(`+-+ - Rule - +-+`);
		console.debug(`\tStatements: ${rule.statements.length}`);

		for (const stmt of rule.statements) {
			console.debug(`\t~~ STMT ~~`);
			console.debug(`\t\tBlocks: ${stmt.blocks.length}`);
			console.debug(`\t\tMatchers: ${stmt.matchers.length}`);
		}
	}

	console.debug(`execute:`);
	const result = await ruleset.execute('aaaa');
	console.debug(`RESULT: ${result.data}`);
})();
