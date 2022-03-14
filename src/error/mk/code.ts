import type {ErrorCodeArgs} from '../code/args';
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
export function errorMkCode<EntityT extends string, PathT extends string, CodeT extends string>(
	entity: EntityT,
	path: PathT | PathT[],
	code: CodeT,
	args?: ErrorCodeArgs
): string {
	const pathDelim = errorCodePathDelimiter(args?.pathDelimiter);
	const codeToken = errorCodeToken(args?.codeToken);

	let base: string;
	if (Array.isArray(path)) {
		base = `${entity}${pathDelim}${path.join(pathDelim)}`;
	} else {
		base = `${entity}${pathDelim}${path}`;
	}

	return `${base}${codeToken}${code}`;
}
