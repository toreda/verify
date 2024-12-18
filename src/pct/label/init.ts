import {PctLabelRound} from './round';
import {type PctLabelRoundMode} from './round/mode';
import {type PctLabelWraps} from './wraps';

/**
 * @category Labels
 */
export interface PctLabelInit {
	/**
	 * Fallback Value
	 * Returned by function when `value` can't be returned due to validation problems
	 * or function errors.
	 *
	 * @defaultValue '' (empty string)
	 */
	fallbackValue?: string;
	value: number | string | null;
	/**
	 * Append Text
	 * Text appended to final formatted label.
	 *
	 * @defaultValue `undefined`
	 */
	appendText?: string | null;
	/**
	 * Prepend Text
	 * Text prepended to final formatted label.
	 *
	 * @defaultValue `undefined`
	 */
	prependText?: string | null;
	/** */
	appendPctSign?: boolean | null;
	/**
	 * Multiplier
	 *
	 * Multiply decimal values by this number before returning
	 * the formatted display value.
	 *
	 * @defaultValue 100
	 */
	multiplier?: number | null;
	/**
	 * Wrap Formatted Value
	 */
	wrapIn?: PctLabelWraps;
	/**
	 * Rounding Mode
	 */
	round?: PctLabelRound;
}
