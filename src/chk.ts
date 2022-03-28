import {ChkValue} from './chk/value';
import {Fate} from '@toreda/fate';
import {NodeContains} from './node/contains';
import {NodeHave} from './node/have';
import {NodeIs} from './node/is';
import {NodeMatch} from './node/match';
import {NodeMust} from './node/must';

export interface Chk<ValueT> {
	(value?: ValueT | null): Promise<Fate<ValueT>>;
	must: NodeMust<ValueT>;
	has: NodeHave<ValueT>;
	is: NodeIs<ValueT>;
	matches: NodeMatch<ValueT>;
	contains: NodeContains<ValueT>;
	value: ChkValue<ValueT>;
}
