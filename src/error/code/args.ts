/**
 * Optional arguments used in error code creation. Each arg not explicitly
 * provided uses the arg's default value.
 *
 * @category Errors
 */
export interface ErrorCodeArgs {
	/** 1 or more characters delimiting error path segments.*/
	pathDelimiter?: string;
	/** Signals the end of the error path string and start of the error code string. Uses global
	 * default value if not provided. */
	codeToken?: string;
}
