import {Ruleset} from '../src/ruleset';

(async (): Promise<void> => {
	const ruleset = new Ruleset<number>();
	const value = ruleset.value();
	ruleset.add(
		value.must.be.equalTo(12),
		value.must.be.greaterThan(10),
		value.must.contain.oneOf([10, 11, 13]),
		value.is.greaterThan(9),
		value.is.greaterThan(11),
		value.is.type('string'),
		value.is.not.divisibleBy(10),
		value.must.not.be.equalTo(10),
		value.does.not.contain.oneOf(['one']),
		value.must.haveProperty('name'),
		value.must.havePropertyWithType('name', 'string'),
		value.is.iterable(),
		value.must.be.an.ipv4addr(),
		value.is.type('array'),
		value.is.an.html5Tag()
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

	console.debug(`verify:`);
	const result = await ruleset.verify(15);
	const ctx = result.data;
	console.debug(`Ruleset result: ${result.ok()}`);
	console.debug(`\tOutcome: ${ctx?.outcome}`);
})();
