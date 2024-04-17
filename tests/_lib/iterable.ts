// Async Iterable from MDN docs:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of#iterating_over_async_iterables
const LIMIT = 3;

export const asyncIterable = {
	[Symbol.asyncIterator](): any {
		let i = 0;
		return {
			next(): Promise<any> {
				const done = i === LIMIT;
				const value = done ? undefined : i++;
				return Promise.resolve({value, done});
			},
			return(): {done: boolean} {
				// This will be reached if the consumer called 'break' or 'return' early in the loop.
				return {done: true};
			}
		};
	}
};
