import * as Either from "fp-ts/lib/Either";

import { chained } from ".";

export * from "fp-ts/lib/Either";

export type ErrorOr<A, L extends Error = Error> = Either.Either<L, A>;

export const tryCatch = Either.tryCatch2v;

export const chain = chained(Either.either);
