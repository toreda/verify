import {Fate} from '@toreda/fate';
import type {PatternId} from './id';

export class PatternNode<ValueT> {
	public readonly patternId: PatternId;

	constructor(id: PatternId) {
		this.patternId = id;
	}

	public async execute(value?: ValueT | null): Promise<Fate<never>> {
		const fate = new Fate<never>();

		return fate.setDone(true);
	}
}
