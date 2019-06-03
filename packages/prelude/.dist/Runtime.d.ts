import { Either, Option, Runtime } from ".";
export * from "io-ts";
export declare type ReadonlyTypeOf<A extends Runtime.Any> = Readonly<Runtime.TypeOf<A>>;
export declare const maybe: <A extends Runtime.Any>(type: A) => Runtime.UnionC<[A, Runtime.NullC, Runtime.UndefinedC]>;
export declare const decode: <A>(type: Runtime.Any, value: unknown) => Either.Either<Error, A>;
export declare const messageFromError: (error: Runtime.ValidationError) => Option.Option<string>;
