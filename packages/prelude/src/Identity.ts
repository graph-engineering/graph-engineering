import { Identity } from ".";

export * from "fp-ts/lib/Identity";

export const it = <A>(value: A): Identity.Identity<A> =>
  new Identity.Identity(value);
