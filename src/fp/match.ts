// eslint-disable-next-line @typescript-eslint/naming-convention
export const _ = Symbol("match/placeholder");
export const $ = Symbol("match/return");

export interface Matcher<T extends TMatched, TPattern, TMatched, TReturn> {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __matcher: (value: T, pattern: TPattern) => TMatched[] | undefined;
  (): TReturn | undefined;
  with<TNReturn>(
    pat: TPattern,
    next: (...args: TMatched[]) => TReturn,
  ): Matcher<T, TPattern, TMatched, TReturn | TNReturn>;
}

export function makeMatcher<T extends TMatched, TPattern, TMatched>(
  matcher: (value: T, pattern: TPattern) => TMatched[] | undefined,
): (value: T) => Matcher<T, TPattern, TMatched, unknown> {
  return (value) => {
    const matches: Array<[TPattern, (...args: TMatched[]) => unknown]> = [];

    function match() {
      for (const [match, next] of matches) {
        const result = matcher(value, match);
        if (result !== undefined) {
          return next(...result);
        }
      }
    }

    match.with = (pat: TPattern, next: (...args: TMatched[]) => unknown) => {
      matches.push([pat, next]);
      return match;
    };

    match.__matcher = matcher;

    return match as Matcher<T, TPattern, TMatched, void>;
  };
}
