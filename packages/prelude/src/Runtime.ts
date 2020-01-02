export * from "io-ts";
import * as Runtime from "io-ts";

import { flow, pipe } from ".";
import * as Either from "./Either";
import * as JSON from "./JSON";
import * as List from "./List";
import * as Option from "./Option";

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
      flow(List.filterMap(errorMessage), list => Error(list.join("\n")))
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
