export class ChkValue<ValueT> {
	private _value: ValueT | null;

	constructor(value?: ValueT | null) {
		if (value === undefined) {
			this._value = null;
		} else {
			this._value = value;
		}
	}

	public set(value?: ValueT | null): boolean {
		if (value === undefined) {
			return false;
		}

		this._value = value;
		return true;
	}

	public get(): ValueT | null {
		if (this._value === undefined) {
			return null;
		}

		return this._value;
	}
}
