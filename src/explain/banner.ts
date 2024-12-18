
import {type ExplainBannerInit} from './banner/init';

/**
 * Prints a banner with verification result details.
 * @param input		input value to test.
 * @param result	Fate returned by `verify(...)` call.
 * @param base		Base logger instance.
 *
 * @category Explain
 */
export function explainBanner(init: ExplainBannerInit): void {

	const log = init.base.makeLog('explain');
	if (!init.result) {
		log.error(`Missing result argument in printResultBanner.`);
		return;
	}

	log.info('------');
	if (!init.result.ok()) {
		log.error(`⚠ Verification encountered an error and stopped: ${init.result.errorCode()}`);
		return;
	}

	log.info(`VERIFICATION RESULT`);
	//${JSON.stringify(result.data?.results)}
	switch (init.result.data?.outcome) {
		case 'pass':
			log.info(`\tOutcome:\t✅ Valid`);
			log.info(`\tReason:\t${init.input}`);
			break;
		case 'fail':
			log.info(`\tOutcome:\t❌ Not Valid`);
			log.info(`\tReason:\t${init.result.data?.failedMatchers.join('\n')}`);
			break;
		case 'skip':
			log.info(`\tOutcome:\t${init.input} skipped.`);
			break;
		case 'error':
			log.info(`\tOutcome:\tError`);
			break;
	}

	log.info(`MATCHER RESULTS`);
	const counts = init.result.data?.summary.counts;
	log.info(`\tPass:\t${counts?.pass} (${counts?.passPct}%)`);
	log.info(`\tFail:\t${counts?.fail} (${counts?.failPct}%)`);
	log.info(`\tError:\t${counts?.error} (${counts?.errorPct}%)`);
	log.info(`\tSkip:\t${counts?.skip} (${counts?.skipPct}%)`);
}
