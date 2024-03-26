import {Fate} from '@toreda/fate';
import {Block} from './block';
import {MatcherBound} from './matcher/bound';
import {MatcherCall} from './matcher/call';
import {MatcherParamId} from './matcher/param/id';

export class Statement {
	public readonly blocks: Block<Statement>[];
	public readonly matchers: MatcherBound<any, any>[];
	public readonly matcherParams: Map<MatcherParamId, unknown>;

	constructor() {
		this.blocks = [];
		this.matchers = [];
		this.matcherParams = new Map<MatcherParamId, unknown>();
	}

	public addMatcher<InputT = unknown, ParamT = unknown>(matcher: MatcherCall<InputT, ParamT>): void {
		const bound = new MatcherBound<InputT, ParamT>(matcher);
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
