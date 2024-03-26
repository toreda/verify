import {type MatcherFlags} from '../flags';

export interface MatcherArrayFlags extends MatcherFlags {
	contains?: boolean;
	exactMatch?: boolean;
}
