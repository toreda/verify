import {Fate} from '@toreda/fate';
import {Block} from './block';
import {MatcherBound} from './matcher/bound';
import {type MatcherCall} from './matcher/call';
import {type MatcherParamId} from './matcher/param/id';

/**
 * @category Statement Blocks
 */
export class Statement {
	public readonly blocks: Block<Statement>[];
	public readonly matchers: MatcherBound<any>[];
	public readonly matcherParams: Map<MatcherParamId, unknown>;

	constructor() {
		this.blocks = [];
		this.matchers = [];
		this.matcherParams = new Map<MatcherParamId, unknown>();
	}

	public addMatcher<InputT = unknown, BoundaryT = unknown>(matcher: MatcherCall<InputT, BoundaryT>): void {
		const bound = new MatcherBound<InputT>(matcher);
		this.matchers.push(bound);
	}

	public async execute<ValueT = unknown>(value?: ValueT | null): Promise<Fate<boolean>> {
		const mainResult = new Fate<boolean>();

		try {
			for (const matcher of this.matchers) {
				const matcherResult = await matcher.execute(value);

				// Matchers return codes when the matching function was interrupted or
				// could not finish evaluating.
				if (!matcherResult.ok()) {
					mainResult.setErrorCode(matcherResult.errorCode());
					break;
				}
			}
		} catch (e: unknown) {
			mainResult.setErrorCode('exception');
		}

		return mainResult;
	}

	public reset(): void {
		this.matchers.length = 0;
		this.blocks.length = 0;
	}
}
