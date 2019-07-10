export * from "io-ts";
import * as Runtime from "io-ts";

import { pipe } from ".";
import * as Array from "./Array";
import * as Either from "./Either";
import * as Error from "./Error";
import { Fn } from "./FP";
import * as JSON from "./JSON";
import * as Option from "./Option";
import * as String from "./String";

export type ReadonlyTypeOf<A extends Runtime.Any> = Readonly<Runtime.TypeOf<A>>;

export const maybe = <A extends Runtime.Any>(
  type: A
  // tslint:disable-next-line: readonly-array
): Runtime.UnionC<[A, Runtime.NullC, Runtime.UndefinedC]> =>
  Runtime.union([type, Runtime.null, Runtime.undefined]);

export const decode = <A>(
  type: Runtime.Any,
  value: unknown
): Either.ErrorOr<A> =>
  Fn.applyFlipped(type.decode(value))(
    Either.mapLeft(
      Fn.flow(
        Array.map(errorMessage),
        Array.catOptions,
        String.joinL("\n"),
        Error.of
      )
    )
  );

export const errorMessage = (
  error: Runtime.ValidationError
): Option.Option<string> =>
  pipe(
    error.context,
    Array.mutable,
    Array.last,
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
              : JSON.stringifyPrettyAlways(error.value)
          }\``
      )
    )
  );