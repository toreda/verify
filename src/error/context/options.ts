export interface ErrorContextOptions<RootT extends string, PathT extends string[]> {
	root: RootT;
	path: PathT;
}
