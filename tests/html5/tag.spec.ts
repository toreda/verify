import {isHtml5Tag} from '../../src/is/html5/tag';
import {type TestCase} from '../_lib/test/case';
const EMPTY_ARRAY: unknown[] = [];
const EMPTY_OBJECT: unknown[] = [];

const TEST_CASES: TestCase[] = [
	{
		value: undefined,
		label: 'undefined',
		result: false
	},
	{
		value: null,
		label: 'null',
		result: false
	},
	{
		value: '',
		label: 'empty string',
		result: false
	},
	{
		value: 1,
		result: false
	},
	{
		value: 0,
		result: false
	},
	{
		value: 'area',
		result: true
	},
	{
		value: 'aside',
		result: true
	},
	{
		value: 'article',
		result: true
	},
	{
		value: 'audio',
		result: true
	},
	{
		value: 'b',
		result: true
	},
	{
		value: 'base',
		result: true
	},
	{
		value: 'basefront',
		result: true
	},
	{
		value: 'bdi',
		result: true
	},
	{
		value: 'bdo',
		result: true
	},
	{
		value: 'blockquote',
		result: true
	},
	{
		value: 'body',
		result: true
	},
	{
		value: 'br',
		result: true
	},
	{
		value: 'button',
		result: true
	},
	{
		value: 'body',
		result: true
	},
	{
		value: 'br',
		result: true
	},
	{
		value: 'button',
		result: true
	},
	{
		value: 'canvas',
		result: true
	},
	{
		value: 'caption',
		result: true
	},
	{
		value: 'cite',
		result: true
	},
	{
		value: 'code',
		result: true
	},
	{
		value: 'col',
		result: true
	},
	{
		value: 'colgroup',
		result: true
	},
	{
		value: 'data',
		result: true
	},
	{
		value: 'del',
		result: true
	},
	{
		value: 'details',
		result: true
	},
	{
		value: 'dfn',
		result: true
	},
	{
		value: 'dialog',
		result: true
	},
	{
		value: 'dir',
		result: true
	},
	{
		value: 'div',
		result: true
	},
	{
		value: 'dl',
		result: true
	},
	{
		value: 'dt',
		result: true
	},
	{
		value: 'em',
		result: true
	},
	{
		value: 'embed',
		result: true
	},
	{
		value: 'fieldset',
		result: true
	},
	{
		value: 'figcaption',
		result: true
	},
	{
		value: 'figure',
		result: true
	},
	{
		value: 'font',
		result: true
	},
	{
		value: 'footer',
		result: true
	},
	{
		value: 'form',
		result: true
	},
	{
		value: 'frame',
		result: true
	},
	{
		value: 'frameset',
		result: true
	},
	{
		value: 'h1',
		result: true
	},
	{
		value: 'h2',
		result: true
	},
	{
		value: 'h3',
		result: true
	},
	{
		value: 'h4',
		result: true
	},
	{
		value: 'h5',
		result: true
	},
	{
		value: 'h6',
		result: true
	},
	{
		value: 'head',
		result: true
	},
	{
		value: 'header',
		result: true
	},
	{
		value: 'hgroup',
		result: true
	},
	{
		value: 'hr',
		result: true
	},
	{
		value: 'html',
		result: true
	},
	{
		value: 'i',
		result: true
	},
	{
		value: 'iframe',
		result: true
	},
	{
		value: 'img',
		result: true
	},
	{
		value: 'input',
		result: true
	},
	{
		value: 'ins',
		result: true
	},
	{
		value: 'kbd',
		result: true
	},
	{
		value: 'keygen',
		result: true
	},
	{
		value: 'label',
		result: true
	},
	{
		value: 'legend',
		result: true
	},
	{
		value: 'li',
		result: true
	},
	{
		value: 'link',
		result: true
	},
	{
		value: 'main',
		result: true
	},
	{
		value: 'map',
		result: true
	},
	{
		value: 'mark',
		result: true
	},
	{
		value: 'menu',
		result: true
	},
	{
		value: 'menuitem',
		result: true
	},
	{
		value: 'meta',
		result: true
	},
	{
		value: 'meter',
		result: true
	},
	{
		value: 'nav',
		result: true
	},
	{
		value: 'noframes',
		result: true
	},
	{
		value: 'noscript',
		result: true
	},
	{
		value: 'object',
		result: true
	},
	{
		value: 'ol',
		result: true
	},
	{
		value: 'optgroup',
		result: true
	},
	{
		value: 'option',
		result: true
	},
	{
		value: 'output',
		result: true
	},
	{
		value: 'p',
		result: true
	},
	{
		value: 'param',
		result: true
	},
	{
		value: 'picture',
		result: true
	},
	{
		value: 'pre',
		result: true
	},
	{
		value: 'progress',
		result: true
	},
	{
		value: 'q',
		result: true
	},
	{
		value: 'rp',
		result: true
	},
	{
		value: 'rt',
		result: true
	},
	{
		value: 'ruby',
		result: true
	},
	{
		value: 's',
		result: true
	},
	{
		value: 'samp',
		result: true
	},
	{
		value: 'script',
		result: true
	},
	{
		value: 'section',
		result: true
	},
	{
		value: 'select',
		result: true
	},
	{
		value: 'small',
		result: true
	},
	{
		value: 'source',
		result: true
	},
	{
		value: 'span',
		result: true
	},
	{
		value: 'strike',
		result: true
	},
	{
		value: 'strong',
		result: true
	},
	{
		value: 'style',
		result: true
	},
	{
		value: 'sub',
		result: true
	},
	{
		value: 'summary',
		result: true
	},
	{
		value: 'sup',
		result: true
	},
	{
		value: 'svg',
		result: true
	},
	{
		value: 'table',
		result: true
	},
	{
		value: 'tbody',
		result: true
	},
	{
		value: 'td',
		result: true
	},
	{
		value: 'template',
		result: true
	},
	{
		value: 'textarea',
		result: true
	},
	{
		value: 'tfoot',
		result: true
	},
	{
		value: 'th',
		result: true
	},
	{
		value: 'thead',
		result: true
	},
	{
		value: 'time',
		result: true
	},
	{
		value: 'title',
		result: true
	},
	{
		value: 'tr',
		result: true
	},
	{
		value: 'track',
		result: true
	},
	{
		value: 'tt',
		result: true
	},
	{
		value: 'u',
		result: true
	},
	{
		value: 'ul',
		result: true
	},
	{
		value: 'var',
		result: true
	},
	{
		value: 'video',
		result: true
	},
	{
		value: 'wbr',
		result: true
	},
	{
		label: 'empty object',
		value: EMPTY_OBJECT,
		result: false
	},
	{
		label: 'empty array',
		value: EMPTY_ARRAY,
		result: false
	}
];

describe('isHtml5Tag', () => {
	for (const testCase of TEST_CASES) {
		const label = testCase.label ?? testCase.value;

		it(`should return ${testCase.result} when input is ${label}`, () => {
			const result = isHtml5Tag(testCase.value);

			expect(result).toBe(testCase.result);
		});
	}
});
