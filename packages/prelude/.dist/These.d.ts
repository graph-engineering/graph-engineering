import { Option, These } from ".";
export * from "fp-ts/lib/These";
export declare const fromNullables: <L, A>(
  l?: L,
  a?: A
) => Option.Option<These.These<L, A>>;
