import {MatcherFunc} from 'src/matcher/func';
import type {Node} from '../node';

export interface NodeOptions {
	matcher?: MatcherFunc<unknown, unknown>;
	children?: Node<unknown, unknown>[];
}
