import {ChkResult} from './result';
import {Fate} from '@toreda/fate';
import {NodeContains} from '../node/contains';
import {NodeHave} from 'src/node/have';
import {NodeIs} from 'src/node/is';
import {NodeMatch} from 'src/node/match';
import {NodeMust} from '../node/must';
import {NodeRoot} from '../node/root';

export class ChkChain<ValueT> {
	public readonly must: NodeMust<ValueT>;
	public readonly contains: NodeContains<ValueT>;
	public readonly is: NodeIs<ValueT>;
	public readonly has: NodeHave<ValueT>;
	public readonly matches: NodeMatch<ValueT>;
	private readonly root: NodeRoot<ValueT>;

	constructor(root: NodeRoot<ValueT>) {
		this.root = root;
		this.must = new NodeMust<ValueT>(root);
		this.contains = new NodeContains<ValueT>(root);
		this.has = new NodeHave<ValueT>(root);
		this.is = new NodeIs<ValueT>(root);
		this.matches = new NodeMatch<ValueT>(root);
	}

	public async execute(value?: ValueT | null): Promise<Fate<ChkResult<ValueT>>> {
		const fate = new Fate<ChkResult<ValueT>>();
		const result = new ChkResult<ValueT>();
		fate.data = result;

		return fate;
	}
}
