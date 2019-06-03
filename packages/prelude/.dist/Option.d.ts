import * as Option from "fp-ts/lib/Option";
export * from "fp-ts/lib/Option";
export declare const chain: import("fp-ts-contrib/lib/Do").Do1<"Option", {}>;
export declare const merge: <A>(first: Option.Option<A>, second: Option.Option<A>, merge: (first: A, second: A) => A) => Option.Option<A>;
