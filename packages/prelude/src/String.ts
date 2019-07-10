import { Fn } from "./FP";

export const join = (string: string, strings: readonly string[]): string =>
  strings.join(string);

export const joinL: (
  string: string
) => (strings: readonly string[]) => string = Fn.curry(join);
