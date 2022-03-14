import type {ErrorCodeArgs} from './code/args';
import type {ErrorCodeData} from './code/data';
import {errorCodePathDelimiter} from './code/path/delimiter';
import {errorCodeToken} from './code/token';

/**
 * @category Errors
 */
export class ErrorCode<EntityT extends string, PathT extends string, CodeT extends string> {
	public readonly entity: string;
	public readonly path: string[];
	public readonly code: string;
	public readonly pathDelim: string;
	public readonly codeToken: string;

	constructor(entity: EntityT, path: PathT | PathT[], code: CodeT, args?: ErrorCodeArgs) {
		this.entity = entity ?? '___';
		this.path = this.mkPath(path, args);
		this.code = code ?? '___';

		this.pathDelim = errorCodePathDelimiter(args?.pathDelimiter);
		this.codeToken = errorCodeToken(args?.codeToken);
	}

	/**
	 * Create 
	 * @param value
	 * @param args
	 * @returns
	 */
	public mkPath(value?: PathT | PathT[], args?: ErrorCodeArgs): string[] {
		if (Array.isArray(value)) {
			return value;
		}

		if (typeof value === 'string') {
			return [value];
		}

		return [];
	}

	public toData(): ErrorCodeData {
		return {
			entity: this.entity,
			path: this.path,
			code: this.code,
			codeToken: this.codeToken,
			pathDelim: this.pathDelim
		};
	}
}
