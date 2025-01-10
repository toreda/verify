import {type Bool, boolMake, type UInt, uIntMake} from '@toreda/strong-types';
import {type SchemaVerifyFlags} from '../schema/verify/flags';
import Defaults from '../defaults';
import {type Resettable} from '@toreda/types';

/**
 * @category Schemas
 */
export class SchemaVerifyConfig implements Resettable {
	public readonly failOnEmptyInputObject: Bool;
	public readonly minFieldCount: UInt;
	public readonly maxFieldCount: UInt;
	public readonly skipFirstTracerChild: Bool;

	constructor(flags?: SchemaVerifyFlags) {
		this.failOnEmptyInputObject = boolMake(
			Defaults.Schema.FailOnEmptyInputObject,
			flags?.failOnEmptyInputObject
		);

		this.skipFirstTracerChild = boolMake(
			Defaults.Schema.SkipFirstTracerChild,
			flags?.skipFirstTracerChild
		);
		this.maxFieldCount = uIntMake(Defaults.Schema.MaxFieldCount, flags?.maxFieldCount);
		this.minFieldCount = uIntMake(Defaults.Schema.MinFieldCount, flags?.minFieldCount);
	}

	public reset(): void {
		this.maxFieldCount.reset();
		this.minFieldCount.reset();
		this.skipFirstTracerChild.reset();
		this.failOnEmptyInputObject.reset();
	}
}
