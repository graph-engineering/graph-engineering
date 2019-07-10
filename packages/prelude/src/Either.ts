export * from "fp-ts/lib/Either";
import * as Either from "fp-ts/lib/Either";

import { chainOf } from ".";
import * as Error from "./Error";
import { Fn } from "./FP";

export type ErrorOr<A, L extends Error = Error> = Either.Either<L, A>;

export const chained = chainOf(Either.either);

export const tryCatch = Either.tryCatch2v;
export const tryCatchError = <A>(fn: Fn.Lazy<A>): ErrorOr<A> =>
  tryCatch(fn, Error.of);
