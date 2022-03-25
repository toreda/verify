/**
 * @category Matchers
 */
export type Matcher<NextT, CmpT> = (...arg: CmpT[]) => NextT;
