import { JSON, Maybe, Option, property } from ".";

export * from "fp-ts/lib/Exception";

export type Exception = Error;

export const crashL = (exception: unknown) => (): never => crash(exception);
export const crash = (exception: unknown): never => {
  throw unknown(exception);
};

export const detailed = (message: string, details: any): Exception =>
  Error(`${message}\n\n${JSON.stringifyPrettyAlways(details)}`);

export const detailedL = (message: string, knownDetails?: Maybe<any>) => (
  unknownDetails: unknown
): Exception =>
  detailed(
    message,
    knownDetails
      ? { details: knownDetails, exception: unknownDetails }
      : unknownDetails
  );

export const merge = (
  message: string,
  exceptions: ReadonlyArray<Exception>
): Exception =>
  detailed(
    [message, "", ...exceptions.map(property("message"))].join("\n"),
    exceptions
  );

export const mergeL = (message: string) => (
  exceptions: ReadonlyArray<Exception>
): Exception => merge(message, exceptions);

export const unknown = (exception: unknown): Exception =>
  Option.fromNullable<any>(exception).fold(
    Error("An unknown error occurred"),
    exception =>
      exception instanceof Error
        ? exception
        : typeof exception === "object" && "message" in (exception as object)
        ? Error(exception.message)
        : typeof exception === "string"
        ? Error(exception)
        : Error(
            `An unknown error occurred...\n\n${JSON.stringifyPrettyAlways(
              exception
            )}`
          )
  );
