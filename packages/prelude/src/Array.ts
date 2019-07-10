export * from "fp-ts/lib/Array";

import { Maybe, pipe } from ".";
import * as Array from "./Array";
import * as Option from "./Option";

// This is required since fp-ts doesn't work with readonly arrays yet...
// tslint:disable readonly-array

export const of = <A>(a: A): A[] => [a];

export const mutable = <A>(as: A[] | readonly A[]): A[] => as as A[];

export const nonNullables = <A>(as: Maybe<A>[]): A[] =>
  Array.reduce<Maybe<A>, A[]>([], (as, a) =>
    pipe(
      a,
      Option.fromNullable,
      Option.map(a => [...as, a]),
      Option.getOrElse(() => as)
    )
  )(as);
