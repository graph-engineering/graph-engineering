import * as Either from "fp-ts/lib/Either";
export * from "fp-ts/lib/Either";
export declare type ErrorOr<A, L extends Error = Error> = Either.Either<L, A>;
export declare const tryCatch: <L, A>(
  f: import("fp-ts/lib/function").Lazy<A>,
  onerror: (e: unknown) => L
) => Either.Either<L, A>;
export declare const chain: import("fp-ts-contrib/lib/Do").Do2<"Either", {}>;
