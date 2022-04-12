/**
 * Optional flags which alter behavior for a single matcher. Must be provided
 * when matcher factory function invoked. Cannot be changed after matcher is
 * created.
 *
 * @category Matchers
 */
export interface MatcherFlags {
	/** Invert matcher result value. */
	invertResult: boolean;
}
