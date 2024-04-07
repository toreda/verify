import Defaults from '../../src/defaults';
import {ErrorContext} from '../../src/error/context';

type SampleCodes = 'code1' | 'code2' | 'root3' | 'sampleroot';
type SamplePaths = 'a' | 'b' | 'c';

const EMPTY_ARRAY = [];
const SAMPLE_ROOT: SampleCodes = 'sampleroot';
const SAMPLE_PATH1: SamplePaths = 'a';
const SAMPLE_PATH2: SamplePaths = 'b';

describe('ErrorContext', () => {
	let instance: ErrorContext<SampleCodes, SamplePaths>;

	beforeAll(() => {
		instance = new ErrorContext<SampleCodes, SamplePaths>('code1');
	});

	describe('Constructor', () => {
		it(`should initialize root to default when root arg is undefined`, () => {
			const custom = new ErrorContext<SampleCodes, SamplePaths>(undefined as any);
			expect(custom.root).toBe(Defaults.ErrorCode.Root);
		});

		it(`should initialize root to default when root arg is null`, () => {
			const custom = new ErrorContext<SampleCodes, SamplePaths>(null as any);
			expect(custom.root).toBe(Defaults.ErrorCode.Root);
		});

		it(`should initialize path to an array when path arg is undefined`, () => {
			const custom = new ErrorContext<SampleCodes, SamplePaths>(SAMPLE_ROOT, undefined as any);
			expect(custom).toHaveProperty('path');
			expect(Array.isArray(custom.path)).toBe(true);
		});

		it(`should initialize path to an array when path arg is null`, () => {
			const custom = new ErrorContext<SampleCodes, SamplePaths>(SAMPLE_ROOT, null as any);
			expect(custom).toHaveProperty('path');
			expect(Array.isArray(custom.path)).toBe(true);
		});

		it(`should add path arg to path array`, () => {
			const custom = new ErrorContext<SampleCodes, SamplePaths>(SAMPLE_ROOT, SAMPLE_PATH1);
			expect(custom.path.includes(SAMPLE_PATH1)).toBe(true);
			expect(Array.isArray(custom.path)).toBe(true);
		});

		it(`should add path args to path array`, () => {
			const custom = new ErrorContext<SampleCodes, SamplePaths>(
				SAMPLE_ROOT,
				SAMPLE_PATH1,
				SAMPLE_PATH2
			);
			expect(custom.path.includes(SAMPLE_PATH1)).toBe(true);
			expect(custom.path.includes(SAMPLE_PATH2)).toBe(true);
			expect(Array.isArray(custom.path)).toBe(true);
		});
	});

	describe('Implementation', () => {
		describe('toData', () => {
			it(`should return an object containing the context root`, () => {
				const root: SampleCodes = 'root3';
				const custom = new ErrorContext<SampleCodes, SamplePaths>(root);

				expect(custom.root).toBe(root);

				const data = custom.toData();
				expect(data).toHaveProperty('root');
				expect(typeof data.root).toBe('string');
				expect(data.root).toStrictEqual(root);
			});
		});
	});
});
