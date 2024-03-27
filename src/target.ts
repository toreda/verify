import {BlockHave} from './block/have';
import {BlockMust} from './block/must';
import {Rule} from './rule';
import {Statement} from './statement';

export const target = new Proxy(new Rule(), {
	get: (target: Rule, prop: keyof Rule | keyof Rule): any => {
		console.info('@@@@@@@@@@@@@@@@@@@@');
		const stmt = new Statement();

		switch (prop) {
			case 'must':
				target.add(stmt);
				return new BlockMust(stmt);
			/* 			case 'matches':
				target.add(stmt);
				return new BlockMatch(stmt); */
			case 'has':
				target.add(stmt);
				return new BlockHave(stmt);
			case 'is':
				target.add(stmt);
				return new BlockMust(stmt);
			default:
				return target[prop];
		}
	}
});
