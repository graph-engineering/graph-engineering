export * from "fp-ts/lib/These";

import { Maybe, pipe } from ".";
import * as Array from "./Array";
import * as Either from "./Either";
import { NonEmptyArray } from "./FP";
import * as Option from "./Option";
import * as These from "./These";

export const fromNullables = <A, B>(
  a?: Maybe<A>,
  b?: Maybe<B>
): Option.Option<These.These<A, B>> =>
  These.fromOptions(Option.fromNullable(a), Option.fromNullable(b));

export const fromEithers = <A, B>(
  eithers: readonly Either.Either<B, A>[]
): Option.Option<
  These.These<NonEmptyArray.NonEmptyArray<B>, NonEmptyArray.NonEmptyArray<A>>
> =>
  pipe(
    Array.separate(eithers),
    ({ left, right }) =>
      pipe(
        These.fromOptions(
          NonEmptyArray.fromArray(left),
          NonEmptyArray.fromArray(right)
        )
      )
  );
