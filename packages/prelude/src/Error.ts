import { pipe } from ".";
import * as Array from "./Array";
import { Fn } from "./FP";
import * as JSON from "./JSON";
import * as Nullable from "./Nullable";
import * as Option from "./Option";
import * as These from "./These";

export { Error_ as Error };

// tslint:disable-next-line: variable-name
const Error_ = Error;

export type ErrorOr<A> = A | Error;

export const from = (error?: Nullable.Nullable<unknown>): Error => {
  const unknownMessage = "An unknown error occurred";

  const errorFromNoInput = () => Error(unknownMessage);
  const errorFromInput = (error: unknown) =>
    error instanceof Error
      ? error
      : typeof error === "string"
      ? Error(error)
      : Error(`${unknownMessage}...\n\n${JSON.Stringify.Always.pretty(error)}`);

  return pipe(
    error,
    Option.fromNullable,
    Option.map(errorFromInput),
    Option.getOrElse(errorFromNoInput)
  );
};

export const fromL = (error?: Nullable.Nullable<unknown>) => (): Error =>
  from(error);

export const throwL = (error?: Nullable.Nullable<unknown>) => (): never =>
  throw_(error);

export { throw_ as throw };
const throw_ = (error?: Nullable.Nullable<unknown>): never => {
  throw from(error);
};

export const detailed = (
  messageOrError?: Nullable.Nullable<unknown>,
  details?: Nullable.Nullable<unknown>
): Error =>
  pipe(
    These.fromNullables(messageOrError, details),
    Option.fold(
      from,
      These.fold(from, from, (messageOrError, details) =>
        from(`${from(messageOrError).message}\n\n${from(details)}`)
      )
    )
  );

export const detailedL = (
  messageOrError?: Nullable.Nullable<unknown>,
  details?: Nullable.Nullable<unknown>
) => (error?: Nullable.Nullable<unknown>): Error =>
  detailed(
    messageOrError,
    pipe(
      These.fromNullables(details, error),
      Option.fold(
        Fn.constUndefined,
        These.fold(Fn.identity, Fn.identity, (details, error) => ({
          details,
          error
        }))
      )
    )
  );

export const concat = (a: Error, b: Error): Error =>
  Error(`${a.message}\n\n${b.message}`);

export const concatAll = (errors: readonly Error[]): Error =>
  pipe(
    errors,
    Array.reduce(from("Several errors occured..."), concat)
  );
