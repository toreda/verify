import {Fate} from '@toreda/fate';
import {type VerifiedMap} from '../../verified/map';
import {type VerifiedArray} from '../../verified/array';

export async function transformVerifiedField<DataT, TransformedT>(
	id: string,
	data: DataT | VerifiedMap<DataT> | VerifiedArray<DataT>
): Promise<Fate<TransformedT | TransformedT[]>> {
	const fate = new Fate<any>();

	if (Array.isArray(data)) {
		fate.data = [];
		for (const item of data) {
			const result = await transformVerifiedField<DataT, TransformedT>('xxxx', item);
			if (result.ok()) {
				fate.data.push(result.data);
			} else {
			}
		}
	} else if (data instanceof Map) {
		for (const [id, field] of data) {
		}
	}

	return fate;
}
