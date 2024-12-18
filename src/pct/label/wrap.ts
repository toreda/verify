/**
 * Params for wrapping pct labels in other text.
 *
 * @example Parens
 * const value = 'aaa';
 * wrapIn: {
 *   before: ' (',
 *   after: ')
 * }
 * // Calling pctLabel produces: ' (aaa)'
 *
 * @category Labels
 */
export interface PctLabelWrap {
	
	before: string;
	after: string;
}
