export * from "fp-ts/lib/Either";
import * as Apply from "fp-ts/lib/Apply";
import * as Either from "fp-ts/lib/Either";

import { chainFrom } from ".";
import * as Error from "./Error";
import { Fn } from "./FP";

export type ErrorOr<A, L extends Error = Error> = Either.Either<L, A>;

export const chained = chainFrom(Either.either);
export const fromRecord = Apply.sequenceS(Either.either);
export const fromTuple = Apply.sequenceT(Either.either);

export const tryCatchError = <A>(fn: Fn.Lazy<A>): ErrorOr<A> =>
  Either.tryCatch(fn, Error.from);
