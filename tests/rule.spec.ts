import {Rule} from '../src/rule';

const STMT_METHODS = [
	{
		name: 'must'
	},
	{
		name: 'contains'
	},
	{
		name: 'is'
	},
	{
		name: 'has'
	},
	{
		name: 'matches'
	}
];

describe('Rule', () => {
	let instance: Rule;

	beforeAll(() => {
		instance = new Rule();
	});

	beforeEach(() => {});

	describe('Constructor', () => {});

	describe('Implementation', () => {
		for (const method of STMT_METHODS) {
			it(`should define block function '${method.name}'`, async () => {
				expect(instance).toHaveProperty(method.name);
			});
		}
	});
});
