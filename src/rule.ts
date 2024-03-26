import {Block} from './block';
import {BlockHave} from './block/have';
import {BlockIs} from './block/is';
import {BlockMust} from './block/must';
import {Statement} from './statement';

export class Rule<ValueT = unknown> {
	public readonly statements: Statement[];
	public readonly must: BlockMust<ValueT>;
	public readonly is: BlockIs<ValueT>;
	public readonly has: BlockHave<ValueT>;

	constructor() {
		const blocks: Block[] = [];
		this.must = new BlockMust<ValueT>(blocks);
		this.is = new BlockIs(blocks);
		this.has = new BlockHave(blocks);
		this.statements = [];
	}

	public add(stmt: Statement): void {
		if (!stmt) {
			return;
		}

		this.statements.push(stmt);
	}
}
