import * as NonEmptyArray from "fp-ts/lib/NonEmptyArray";

import { pipe } from ".";
import * as Either from "./Either";
import * as List from "./List";
import * as Option from "./Option";

export type Validation<A> = Either.Either<Errors, A>;
export type Errors = NonEmptyArray.NonEmptyArray<Error>;
export type Check<A> = (a: A) => Either.ErrorOr<A>;

export const fromChecks = <A>(
  ...checks: NonEmptyArray.NonEmptyArray<Check<A>>
) => (a: A): Validation<A> =>
  pipe(
    checks,
    List.map(check => check(a)),
    List.lefts,
    NonEmptyArray.fromArray,
    Option.fold(
      () => Either.right(a),
      errors => Either.left(errors)
    )
  );
