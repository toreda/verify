import {Chk} from '../chk';
import {ChkChain} from './chain';
import {ChkResult} from './result';
import {ChkRoot} from '../chk/root';
import {Fate} from '@toreda/fate';
import {NodeMust} from 'src/node/must';

export function chkMk<ValueT>(): Chk<ValueT> {
	const root = new ChkRoot<ValueT>();
	const chain = new ChkChain<ValueT>(root);

	return Object.assign(
		async (value?: ValueT | null): Promise<Fate<ChkResult<ValueT>>> => {
			if
			return root.execute(value);
		},
		{
			must: chain.must,
			contains: chain.contains,
			has: chain.has,
			is: chain.is,
			matches: chain.matches,
			value: root.value
		}
	);
}
