import {Fate} from '@toreda/fate';
import {Rule} from '../rule';
import {Statement} from '../statement';
import {BlockContains} from './contains';
import {BlockHave} from './have';
import {BlockIs} from './is';
import {BlockMatch} from './match';
import {BlockMust} from './must';
import {BlockWithNot} from './with/not';
import {VerifierResult} from '../verifier/result';
import {VerifierFlags} from '../verifier/flags';
import {BlockDoes} from './does';

export type BlockWrapper<InputT> =
	| BlockWithNot<
			| BlockContains<InputT>
			| BlockMust<InputT>
			| BlockHave<InputT>
			| BlockMatch<InputT>
			| BlockDoes<InputT>
			| BlockIs<InputT>
	  >
	| Rule<InputT>
	| Statement<InputT>[]
	| ((stmt: Statement<InputT>) => Rule<InputT>)
	| ((value: InputT | null, flags?: VerifierFlags) => Promise<Fate<VerifierResult>>)
	| (() => void);
