/**
 *
 *
 * @category Validation
 */
export interface ChkFlags {
	length?: {
		min?: number;
		max?: number;
	};
	/**
	 * Do not trim the string value before validation. String values are automatically trimmed
	 * prior to validation unless this flag is true. Trimming values which have already been
	 * Default: true
	 */
	notrim?: boolean;
	/**
	 * Extra flags to allow patterns which are otherwise disallowed by default.
	 */
	allow?: {
		/**
		 * Allow empty string values. Empty strings and strings that trim down to empty strings
		 * fail validation when set to `false`.
		 * Default: false
		 */
		empty?: boolean;
	};
}
