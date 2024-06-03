import {Fate} from '@toreda/fate';
import {type VerifiedArray} from '../../verified/array';

export async function transformVerifiedArray<DataT, VerifiedT>(
	input: VerifiedArray<DataT>
): Promise<Fate<VerifiedT[]>> {
	const fate = new Fate<VerifiedT[]>({
		data: []
	});

	return fate;
}
