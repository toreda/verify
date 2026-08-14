import {defineConfig} from 'tsdown';

export default defineConfig({
	entry: ['src/index.ts'],
	format: ['cjs', 'esm'],
	dts: true,
	sourcemap: true,
	clean: true,
	target: 'es2022',
	outDir: 'dist',
	// Runtime imports resolved from the consumer's node_modules rather than
	// bundled, so a single copy of each (e.g. the Fate class) is shared
	// between this package and the consumer.
	deps: {
		neverBundle: [/^@toreda\//, 'big.js']
	}
});
