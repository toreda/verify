import {Ruleset} from '../src/ruleset';

(async (): Promise<void> => {
	const ruleset = new Ruleset<number>();
	const value = ruleset.makeValue();
	ruleset.add(
		value.must.be.equalTo(12),
		value.must.be.greaterThan(10),
		value.must.contain.oneOf([10, 11, 13]),
		value.is.greaterThan(9),
		value.is.greaterThan(11),
		value.must.not.be.equalTo(10)
	);

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
	const result = await ruleset.execute(15);
	const ctx = result.data;
	console.debug(`Ruleset result: ${result.ok()}`);
	console.debug(`\tOutcome: ${ctx?.outcome}`);
})();
