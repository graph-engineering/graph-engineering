import { Apply, chainFrom, Either, Exception, Fn, List, pipe } from ".";

export * from "fp-ts/lib/Either";

export type Validated<A, L extends Error = Error> = Either.Either<Errors<L>, A>;
export type Validation<A, L extends Error = Error> = (a: A) => Validated<A, L>;

export type Errors<A extends Error = Error> = readonly A[];
export type ErrorOr<A, L extends Error = Error> = Either.Either<L, A>;

export const chained = () => chainFrom(Either.either);
export const fromRecord = () => Apply.sequenceS(Either.either);
export const fromTuple = () => Apply.sequenceT(Either.either);

export const fromTry = <A>(fn: Fn.Lazy<A>): ErrorOr<A> =>
  Either.tryCatch(fn, Exception.from);

export const fromValidations = <A, L extends Error = Error>(
  ...validations: readonly Validation<A, L>[]
) => (a: A): Validated<A, L> =>
  pipe(
    validations,
    List.map(validation => validation(a)),
    List.lefts,
    Either.fromPredicate(List.isEmpty, List.flatten),
    Either.map(() => a)
  );
