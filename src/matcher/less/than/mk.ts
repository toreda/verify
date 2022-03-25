import type {Matcher} from '../../../matcher';

export function matcherLessThanMk<NextT>(next: NextT): Matcher<NextT, number> {
	return (value: number) => {
		return next;
	};
}
