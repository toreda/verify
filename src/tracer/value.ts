import {Tracer} from '../tracer';

/**
 * Validate each argument return the first Tracer instance found.
 * Returns a new Tracer if there isn't at least 1 tracer argument.
 *
 * @param instances
 */
export function tracerValue(...instances: Tracer[]): Tracer {
	if (!Array.isArray(instances)) {
		return new Tracer();
	}

	for (const instance of instances) {
		if (instance instanceof Tracer) {
			return instance;
		}
	}

	return new Tracer();
}
