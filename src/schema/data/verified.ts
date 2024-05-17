import {SchemaData} from '../data';

export type SchemaDataVerified<DataT> = Map<string, DataT | SchemaData<DataT> | null>;
