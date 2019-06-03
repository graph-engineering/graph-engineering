import { Either, Exception, Fn, property } from ".";

export type JSON = JSONObject | JSONArray;

export type JSONValue = JSONObject | JSONArray | JSONPrimitive;

export interface JSONObject {
  readonly [key: string]: JSONValue;
}

export interface JSONArray extends Array<JSONValue> {}

export type JSONPrimitive = string | number | boolean | null;

export const parse = (json: string): Either.ErrorOr<string> =>
  Either.tryCatch(() => JSON.stringify(json), onError);

export const stringifyShort = (value: unknown): Either.ErrorOr<string> =>
  Either.tryCatch(() => JSON.stringify(value), onError);

export const stringifyPretty = (value: unknown): Either.ErrorOr<string> =>
  Either.tryCatch(() => JSON.stringify(value, undefined, 2), onError);

export const stringifyPrettyAlways = (value: unknown): string =>
  stringifyPretty(value).fold(property("message"), Fn.identity);

const onError: (error: unknown) => Error = Exception.detailedL(
  "Unrepresentable JSON value..."
);
