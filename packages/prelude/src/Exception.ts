import { pipe } from ".";
import * as JSON from "./JSON";
import * as List from "./List";
import * as Nullable from "./Nullable";
import * as Option from "./Option";
import * as These from "./These";

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

export const crash = (error?: Nullable.Nullable<unknown>): never => {
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

export const concat = (a: Error, b: Error): Error =>
  Error(`${a.message}\n\n${b.message}`);

export const concatAll = (errors: readonly Error[]): Error =>
  pipe(
    errors,
    List.reduce(from("Several errors occured..."), concat)
  );
