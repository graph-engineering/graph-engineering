import { Maybe, Option, These } from ".";

export * from "fp-ts/lib/These";

export const fromNullables = <L, A>(
  l?: Maybe<L>,
  a?: Maybe<A>
): Option.Option<These.These<L, A>> =>
  These.fromOptions(Option.fromNullable(l), Option.fromNullable(a));
