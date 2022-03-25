import type {ErrorCodeFlags} from '../code/flags';
import {errorCodePathDelimiter} from '../code/path/delimiter';
import {errorCodeToken} from '../code/token';

/**
 * Create error code with error path details.
 * @param entity    Root of the error entity identified by this error code.
 *                		Example: 'fridge' is the root For code 'fridge::door::light|burned_out'
 * @param path    	One or more path components identifying the error origin in entity.
 *						Example: 'door::light' is the path in code 'fridge::door::light|burned_out'
 *
 * @param code    Error code originating in
 *
 * @category Errors
 */
export function errorMkCode<CodeT extends string, EntityT extends string, PathT extends string>(
	code: CodeT,
	entity: EntityT,
	path: PathT | PathT[],
	opts?: ErrorCodeFlags
): string {
	const codeToken = errorCodeToken(opts?.codeToken);
	const pathDelim = errorCodePathDelimiter(opts?.pathDelimiter);
	let base: string;

	if (Array.isArray(path)) {
		base = `${entity}${pathDelim}${path.join(pathDelim)}`;
	} else if (typeof path === 'string') {
		base = `${entity}${pathDelim}${path}`;
	} else {
		base = `${entity}`;
	}

	return `${base}${codeToken}${code}`;
}
