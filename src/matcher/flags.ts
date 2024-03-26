import {type BlockFlags} from '../block/flags';

export interface MatcherFlags extends BlockFlags {
	caseSensitive?: boolean;
}
