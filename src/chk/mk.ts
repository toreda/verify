import {Chk} from '../chk';
import {ChkChain} from './chain';
import {ChkResult} from './result';
import {Fate} from '@toreda/fate';
import {NodeRoot} from '../node/root';

export function chkMk<ValueT>(): Chk<ValueT> {
	const root = new NodeRoot<ValueT>();
	const chain = new ChkChain<ValueT>(root);

	return Object.assign(
		async (value?: ValueT | null): Promise<Fate<ChkResult<ValueT>>> => {
			return chain.execute(value);
		},
		{
			must: chain.must,
			contains: chain.contains,
			has: chain.has,
			is: chain.is,
			matches: chain.matches
		}
	);
}
