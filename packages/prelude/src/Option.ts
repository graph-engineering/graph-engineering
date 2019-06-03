import * as Option from "fp-ts/lib/Option";

import { chained, Fn, These } from ".";

export * from "fp-ts/lib/Option";

export const chain = chained(Option.option);

export const merge = <A>(
  first: Option.Option<A>,
  second: Option.Option<A>,
  merge: (first: A, second: A) => A
): Option.Option<A> =>
  These.fromOptions(first, second).map<A>(these =>
    these.fold(Fn.identity, Fn.identity, merge)
  );
