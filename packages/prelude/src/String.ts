export { String_ as String };

// tslint:disable-next-line: variable-name
const String_ = String;

export const join = (string: string) => (strings: readonly string[]): string =>
  strings.join(string);
