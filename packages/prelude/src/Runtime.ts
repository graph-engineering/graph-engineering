import { Either, flow, identity, JSON, List, Option, pipe, Runtime } from ".";

export * from "io-ts";

export type ToType<
  A extends (() => Runtime.Any) | Runtime.Any
> = A extends () => Runtime.Any
  ? Readonly<Runtime.TypeOf<ReturnType<A>>>
  : A extends Runtime.Any
  ? Readonly<Runtime.TypeOf<A>>
  : never;

export const nullable = <A extends Runtime.Any>(
  type: A
): Runtime.UnionC<readonly [A, Runtime.NullC, Runtime.UndefinedC]> =>
  Runtime.union([type, Runtime.null, Runtime.undefined]);

export const fromPredicate = <A>(
  name: string,
  predicate: (a: unknown) => a is A
): Runtime.Type<A> =>
  new Runtime.Type(
    name,
    predicate,
    (a, context) =>
      predicate(a) ? Runtime.success(a) : Runtime.failure(a, context),
    identity
  );

export const decode = <Type extends Runtime.Any, A extends ToType<Type>>(
  type: Type
) => (value?: Option.Nullable<unknown>): Either.ErrorOr<A> =>
  pipe(
    type.decode(value),
    Either.mapLeft(
      flow(List.filterMap(errorMessage), messages =>
        Error(messages.join("\n\n"))
      )
    )
  );

export const errorMessage = (
  error: Runtime.ValidationError
): Option.Option<string> =>
  pipe(
    List.head(error.context),
    Option.map(context => {
      const path = error.context
        .map(context => context.key)
        .filter(key => key.length > 0)
        .join(".");

      const expected = `Expecting \`${context.type.name}\` at \`${path}\``;
      const actual =
        error.value === undefined
          ? "undefined"
          : JSON.Stringify.Always.short(error.value);

      return `${expected}, but instead got \`${actual}\``;
    })
  );
