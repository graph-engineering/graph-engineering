export * from "fp-ts/lib/Array";
import * as Array from "fp-ts/lib/Array";

import { Maybe, pipe } from ".";
import * as Option from "./Option";

// This is required since fp-ts doesn't work with readonly arrays yet...
// tslint:disable readonly-array

export const from = <A>(a: A): A[] => [a];

export const toMutable = <A>(as: A[] | readonly A[]): A[] => as as A[];

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
