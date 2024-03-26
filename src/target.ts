import {BlockContains} from './block/contains';
import {BlockHave} from './block/have';
import {BlockMatch} from './block/match';
import {BlockMust} from './block/must';
import {Rule} from './rule';
import {RuleCallable} from './rule/callable';
import {Statement} from './statement';

export const target = new Proxy(new Rule<unknown>(), {
	get: (target: Rule<unknown>, prop: keyof RuleCallable<unknown> | keyof Rule<unknown>): any => {
		console.info('@@@@@@@@@@@@@@@@@@@@');
		const stmt = new Statement();

		switch (prop) {
			case 'must':
				target.add(stmt);
				return new BlockMust(stmt);
			case 'matches':
				target.add(stmt);
				return new BlockMatch(stmt);
			case 'has':
				target.add(stmt);
				return new BlockHave(stmt);
			case 'is':
				target.add(stmt);
				return new BlockMust(stmt);
			case 'contains':
				target.add(stmt);
				return new BlockContains(stmt);
			default:
				return target[prop];
		}
	}
});
