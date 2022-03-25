import type {Matcher} from '../../../matcher';

export function matcherGreaterThanMk<NextT>(next: NextT): Matcher<NextT, number> {
	return (value: number) => {
		return next;
	};
}
