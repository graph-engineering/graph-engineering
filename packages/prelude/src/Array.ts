export * from "fp-ts/lib/Array";
import * as Array from "fp-ts/lib/Array";

import { Maybe, pipe } from ".";
import * as Option from "./Option";

// TODO: This is a temporary fix for dealing with fp-ts's mutable `Array` module
declare global {
  interface ReadonlyArray<T> extends Array<T> {}
}

export const from = <A>(a: A): A[] => [a];

export const nonNullables = <A>(as: Maybe<A>[]): A[] =>
  pipe(
    as,
    Array.reduce<Maybe<A>, A[]>([], (as, a) =>
      pipe(
        Option.fromNullable(a),
        Option.fold(() => as, a => [...as, a])
      )
    )
  );
