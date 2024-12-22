/**
 *	MIT License
 *
 *	Copyright (c) 2019 - 2025 Toreda, Inc.
 *
 *	Permission is hereby granted, free of charge, to any person obtaining a copy
 *	of this software and associated documentation files (the "Software"), to deal
 *	in the Software without restriction, including without limitation the rights
 *	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *	copies of the Software, and to permit persons to whom the Software is
 *	furnished to do so, subject to the following conditions:

 * 	The above copyright notice and this permission notice shall be included in all
 * 	copies or substantial portions of the Software.
 *
 * 	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * 	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * 	SOFTWARE.
 *
 */

import {type ExplainBannerInit} from './banner/init';

/**
 * Output banner to log with verification details.
 *
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
