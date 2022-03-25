import type {Matcher} from '../../../matcher';

export function matcherEqualToMk<NextT>(next: NextT): Matcher<NextT, number> {
	return (value: number) => {
		return next;
	};
}
