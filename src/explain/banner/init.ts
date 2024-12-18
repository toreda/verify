import {Log} from '@toreda/log';
import {type VerifierResult} from '../../verifier/result';
import {Fate} from '@toreda/fate';

/**
 * @category Explain
 */
export interface ExplainBannerInit {
	input: unknown;
	result: Fate<VerifierResult>;
	base: Log;
}
