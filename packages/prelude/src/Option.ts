export * from "fp-ts/lib/Option";
import * as Option from "fp-ts/lib/Option";

import { chainFrom, pipe, Maybe, property } from ".";
import { Fn } from "./FP";
import * as These from "./These";

export const chained = chainFrom(Option.option);

export const combine = <A>(
  a: Option.Option<A>,
  b: Option.Option<A>,
  fn: (a: A, b: A) => A
): Option.Option<A> =>
  pipe(
    These.fromOptions(a, b),
    Option.map(These.fold(Fn.identity, Fn.identity, fn))
  );

export const fromProperty = <A extends keyof B, B extends Object>(a: A) => (
  b: B
): Option.Option<B[A]> =>
  pipe(
    b,
    property(a),
    Option.fromNullable
  );
