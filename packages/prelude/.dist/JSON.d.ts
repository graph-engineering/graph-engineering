import { Either } from ".";
export declare type JSON = JSONObject | JSONArray;
export declare type JSONValue = JSONObject | JSONArray | JSONPrimitive;
export interface JSONObject {
  readonly [key: string]: JSONValue;
}
export interface JSONArray extends Array<JSONValue> {}
export declare type JSONPrimitive = string | number | boolean | null;
export declare const parse: (json: string) => Either.Either<Error, string>;
export declare const stringifyShort: (
  value: unknown
) => Either.Either<Error, string>;
export declare const stringifyPretty: (
  value: unknown
) => Either.Either<Error, string>;
export declare const stringifyPrettyAlways: (value: unknown) => string;
