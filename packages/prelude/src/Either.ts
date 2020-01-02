export * from "fp-ts/lib/Either";
import * as Apply from "fp-ts/lib/Apply";
import * as Either from "fp-ts/lib/Either";
import * as Fn from "fp-ts/lib/function";

import { chainFrom } from ".";
import * as JSON from "./JSON";

export type ErrorOr<A, L extends Error = Error> = Either.Either<L, A>;

export const chained = chainFrom(Either.either);
export const fromRecord = Apply.sequenceS(Either.either);
export const fromTuple = Apply.sequenceT(Either.either);

export const fromTry = <A>(fn: Fn.Lazy<A>): ErrorOr<A> =>
  Either.tryCatch(fn, error =>
    error instanceof Error
      ? error
      : new Error(`Unknown error...\n\n${JSON.Stringify.Always.pretty(error)}`)
  );
