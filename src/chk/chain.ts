import {ChkChainRoot} from './chain/root';
import {ChkRoot} from './root';
import {Fate} from '@toreda/fate';
import {NodeContains} from '../node/contains';
import {NodeHave} from '../node/have';
import {NodeIs} from '../node/is';
import {NodeMatch} from '../node/match';
import {NodeMust} from '../node/must';

export class ChkChain<ValueT> {
	public readonly must: NodeMust<ValueT>;
	public readonly contains: NodeContains<ValueT>;
	public readonly is: NodeIs<ValueT>;
	public readonly has: NodeHave<ValueT>;
	public readonly matches: NodeMatch<ValueT>;
	private readonly chkRoot: ChkRoot<ValueT>;
	private readonly chainRoot: ChkChainRoot<ValueT>;

	constructor(chkRoot: ChkRoot<ValueT>) {
		this.chkRoot = chkRoot;
		const chainRoot = new ChkChainRoot<ValueT>(chkRoot.value);
		this.must = new NodeMust<ValueT>(chainRoot);
		this.contains = new NodeContains<ValueT>(chainRoot);
		this.has = new NodeHave<ValueT>(chainRoot);
		this.is = new NodeIs<ValueT>(chainRoot);
		this.matches = new NodeMatch<ValueT>(chainRoot);

		this.chainRoot = chainRoot;
	}

	public async execute(value?: ValueT | null): Promise<Fate<never>> {
		const fate = new Fate<never>();

		return fate;
	}
}
