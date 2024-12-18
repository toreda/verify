import {Ruleset} from '../../../src/ruleset';
import {explainBanner} from '../../../src/explain/banner';
import {Levels, Log} from '@toreda/log';

(async (): Promise<void> => {
	const base = new Log({
		globalLevel: Levels.ALL,
		groupsStartEnabled: true,
		consoleEnabled: true
	});

	const ruleset = new Ruleset<number>();
	const value = ruleset.value();
	ruleset.add(value.is.between(0, 5));

	const input = -99;
	// Tests input against all rules in ruleset.
	const result = await ruleset.verify(input);

	explainBanner({
		input: input,
		result: result,
		base: base
	});
})();
