export * from "fp-ts/lib/Array";
import * as Array from "fp-ts/lib/Array";

import { Maybe, pipe } from ".";
import { Fn } from "./FP";
import * as Option from "./Option";

// This is required since fp-ts doesn't work with readonly arrays yet...
// tslint:disable readonly-array

export const from = <A>(a: A): A[] => [a];

export const toMutable = <A>(as: A[] | readonly A[]): A[] => as as A[];

export const nonNullables = <A>(as: Maybe<A>[]): A[] =>
  Fn.applyFlipped(as)(
    Array.reduce<Maybe<A>, A[]>([], (as, a) =>
      pipe(
        a,
        Option.fromNullable,
        Option.map(a => [...as, a]),
        Option.getOrElse(() => as)
      )
    )
  );
