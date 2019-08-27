import { pipe, property } from ".";
import * as Either from "./Either";
import { Fn } from "./FP";

export type JSON = JSONObject | JSONArray;

export type JSONValue = JSONPrimitive | JSONArray | JSONObject;
export type JSONPrimitive = string | number | boolean | null;
export interface JSONArray extends Array<JSONValue> {}
export interface JSONObject {
  readonly [key: string]: JSONValue;
}

export const parse = <A = unknown>(string: string): Either.ErrorOr<A> =>
  Either.tryCatch(() => JSON.parse(string), onError);

export namespace Stringify {
  export const short = (json: unknown): Either.ErrorOr<string> =>
    Either.tryCatch(() => JSON.stringify(json), onError);

  export const pretty = (json: unknown): Either.ErrorOr<string> =>
    Either.tryCatch(() => JSON.stringify(json, undefined, 2), onError);

  export namespace Always {
    export const short = (json: unknown): string =>
      pipe(
        json,
        Stringify.short,
        Either.fold(property("message"), Fn.identity)
      );

    export const pretty = (json: unknown): string =>
      pipe(
        json,
        Stringify.pretty,
        Either.fold(property("message"), Fn.identity)
      );
  }
}

const onError: (error: unknown) => Error = () =>
  Error("Unrepresentable JSON value...");
