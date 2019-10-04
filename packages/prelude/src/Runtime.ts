export * from "io-ts";
import * as Runtime from "io-ts";

import { flow, pipe } from ".";
import * as Array from "./Array";
import * as Either from "./Either";
import * as Error from "./Error";
import * as JSON from "./JSON";
import * as Option from "./Option";
import * as String from "./String";

export type ReadonlyTypeOf<A extends Runtime.Any> = Readonly<Runtime.TypeOf<A>>;

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
    Runtime.identity
  );

export const decode = <
  Type extends Runtime.Any,
  A extends ReadonlyTypeOf<Type>
>(
  type: Type
) => (value: unknown): Either.ErrorOr<A> =>
  pipe(
    type.decode(value),
    Either.mapLeft(
      flow(
        Array.map(errorMessage),
        Array.reduce(Array.empty(), (previous, message) =>
          pipe(
            message,
            Option.fold(() => previous, message => [...previous, message])
          )
        ),
        String.join("\n"),
        Error.from
      )
    )
  );

export const errorMessage = (
  error: Runtime.ValidationError
): Option.Option<string> =>
  pipe(
    Array.last(error.context),
    Option.map(context =>
      pipe(
        error.context
          .map(context => context.key)
          .filter(key => key.length > 0)
          .join("."),
        path =>
          `Expecting \`${context.type.name}\`${
            path === "" ? " " : ` at \`${path}\` `
          }but instead got \`${
            error.value === undefined
              ? "undefined"
              : JSON.Stringify.Always.short(error.value)
          }\``
      )
    )
  );
