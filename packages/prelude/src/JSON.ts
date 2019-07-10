import { property } from ".";
import * as Either from "./Either";
import { Fn } from "./FP";

export type JSON = JSONObject | JSONArray;

export type JSONValue = JSONPrimitive | JSONArray | JSONObject;
export type JSONPrimitive = string | number | boolean | null;
export interface JSONArray extends Array<JSONValue> {}
export interface JSONObject {
  readonly [key: string]: JSONValue;
}

export const parse = (string: string): Either.ErrorOr<string> =>
  Either.tryCatch(() => JSON.parse(string), onError);

export const stringifyShort = (json: unknown): Either.ErrorOr<string> =>
  Either.tryCatch(() => JSON.stringify(json), onError);

export const stringifyShortAlways: (json: unknown) => string = Fn.flow(
  stringifyShort,
  Either.fold(property("message"), Fn.identity)
);

export const stringifyPretty = (json: unknown): Either.ErrorOr<string> =>
  Either.tryCatch(() => JSON.stringify(json, undefined, 2), onError);

export const stringifyPrettyAlways: (json: unknown) => string = Fn.flow(
  stringifyPretty,
  Either.fold(property("message"), Fn.identity)
);

const onError: (error: unknown) => Error = () =>
  Error("Unrepresentable JSON value...");
