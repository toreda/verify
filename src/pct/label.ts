import {booleanValue, numberValue, stringNullValue, stringValue} from '@toreda/strong-types';
import {type PctLabelInit} from './label/init';
import {pctLabelRound} from './label/round';

/**
 * Format numeric values
 * @param init
 *
 * @category Labels
 */
export function pctLabel(init: PctLabelInit): string {
	const fallback = stringValue(init?.fallbackValue, '');
	const appendText = stringNullValue(init?.appendText, null);
	const prependText = stringNullValue(init?.prependText, null);
	const appendPctSign = booleanValue(init?.appendPctSign, true);
	const mult = numberValue(init?.multiplier, 100);

	if (!init) {
		return fallback;
	}

	let value: string;

	// string & number values are accepted. All others rejected.
	if (typeof init.value !== 'number' && typeof init.value !== 'string') {
		return fallback;
	}

	if (typeof init.value === 'number') {
		// NaN is not a valid Percentage display value here.
		if (isNaN(init.value)) {
			return fallback;
		}

		const denormalized = init.value * mult;
		value = denormalized.toString();
	} else {
		// Expects a string value if init.value isn't a number based type check & early drop
		// above. If this function is expanded to support more than number & string, this section
		// needs to either be last after all other types are checked, OR be placed inside a typeof
		// string check.
		value = pctLabelRound(parseFloat(init.value?.trim()), init.round);
	}

	// Prepend `prependText` value if it's a string value.
	if (prependText !== null) {
		value = `${prependText}${value}`;
	}

	// Always appends `appendText` (when set to string), or appends '%' when `appendPctSign`
	// is true (default), but not both.
	if (appendText !== null) {
		value = `${value}${appendText}`;
	} else if (appendPctSign === true) {
		value = `${value}%`;
	}

	return value;
}
