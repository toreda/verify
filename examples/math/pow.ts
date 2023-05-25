import {Levels, Log} from '@toreda/log';

import {powOf} from '../../src/pow/of';

const log = new Log({
	globalLevel: Levels.ALL,
	consoleEnabled: true
});

// 0^0: 0 to the power of 0.
const zeroZero = powOf(0, 0);
log.info(`0 is a power of 0: ${zeroZero}`);

// 0^1: 0 to the power of 1.
const zeroOne = powOf(0, 1);
log.info(`0 is a power of 1: ${zeroOne}`);

// 1 is a power of 1.
const oneOne = powOf(1, 1);
log.info(`1 is a power of 1: ${oneOne}`);

// 100 is a power of 2
const thirtyTwo = powOf(32, 2);
log.info(`32 is a power of 2: ${thirtyTwo}`);

// 100 is a power of 2
const hundredTen = powOf(100, 10);
log.info(`100 is a power of 10: ${hundredTen}`);
