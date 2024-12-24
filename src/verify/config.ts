import {Bool, boolMake, UInt, uIntMake} from '@toreda/strong-types';
import {type SchemaVerifyFlags} from '../schema/verify/flags';
import Defaults from '../defaults';

export class SchemaVerifyConfig {
	public readonly failOnEmptyInputObject: Bool;
	public readonly minFieldCount: UInt;
	public readonly maxFieldCount: UInt;

	constructor(flags?: SchemaVerifyFlags) {
		this.failOnEmptyInputObject = boolMake(
			Defaults.Schema.FailOnEmptyInputObject,
			flags?.failOnEmptyInputObject
		);

		this.maxFieldCount = uIntMake(Defaults.Schema.MaxFieldCount, flags?.maxFieldCount);
		this.minFieldCount = uIntMake(Defaults.Schema.MinFieldCount, flags?.minFieldCount);
	}
}
