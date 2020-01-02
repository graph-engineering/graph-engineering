export * from "fp-ts/lib/These";
import * as NonEmptyArray from "fp-ts/lib/NonEmptyArray";

import { pipe } from ".";
import * as Either from "./Either";
import * as List from "./List";
import * as Option from "./Option";
import * as These from "./These";

export const fromNullables = <A, B>(
  a?: Option.Nullable<A>,
  b?: Option.Nullable<B>
): Option.Option<These.These<A, B>> =>
  These.fromOptions(Option.fromNullable(a), Option.fromNullable(b));

export const fromEithers = <A, B>(
  eithers: readonly Either.Either<B, A>[]
): Option.Option<These.These<
  NonEmptyArray.NonEmptyArray<B>,
  NonEmptyArray.NonEmptyArray<A>
>> =>
  pipe(List.separate(eithers), ({ left, right }) =>
    pipe(
      These.fromOptions(
        NonEmptyArray.fromArray(left),
        NonEmptyArray.fromArray(right)
      )
    )
  );
