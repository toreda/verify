/**
 * Simple data object containing only stringifiable properties. All child properties
 * must be primitives or other simple data objects. Object references and recursive
 * loops are not permitted within ErrorCodeData properties.
 *
 * @category Errors
 */
export interface ErrorCodeData {
	entity: string;
	path: string[];
	code: string;
	codeToken: string;
	pathDelim: string;
}
