import { Either, Fn, JSON, Option, ReadonlyArray, Runtime } from ".";

export * from "io-ts";

export type ReadonlyTypeOf<A extends Runtime.Any> = Readonly<Runtime.TypeOf<A>>;

export const maybe = <A extends Runtime.Any>(
  type: A
): Runtime.UnionC<
  // tslint:disable-next-line: readonly-array
  [A, Runtime.NullC, Runtime.UndefinedC]
> => Runtime.union([type, Runtime.null, Runtime.undefined]);

export const decode = <A>(
  type: Runtime.Any,
  value: unknown
): Either.ErrorOr<A> =>
  type
    .decode(value)
    .mapLeft(errors =>
      Error(ReadonlyArray.catOptions(errors.map(messageFromError)).join("\n"))
    );

export const messageFromError = (
  error: Runtime.ValidationError
): Option.Option<string> =>
  ReadonlyArray.last(error.context).map(context =>
    Fn.applyFlipped(
      error.context
        .map(context => context.key)
        .filter(key => key.length > 0)
        .join(".")
    )(
      path =>
        `Expecting ${context.type.name} ${
          path === "" ? "" : ` at ${path}`
        } but instead got \`${
          error.value === undefined
            ? "undefined"
            : JSON.stringifyPrettyAlways(error.value)
        }\``
    )
  );
