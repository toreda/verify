import type {ItorItem} from '@toreda/types';

export function chkChainsItorItemMk<ValueT>(value: ValueT | null, done: boolean): ItorItem<ValueT | null> {
	return {
		value: value,
		done: typeof done === 'boolean' ? done : true
	};
}
