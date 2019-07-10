export * from "fp-ts/lib/These";

import { Maybe } from ".";
import * as Option from "./Option";
import * as These from "./These";

export const fromNullables = <A, B>(
  a?: Maybe<A>,
  b?: Maybe<B>
): Option.Option<These.These<A, B>> =>
  These.fromOptions(Option.fromNullable(a), Option.fromNullable(b));
