import { Either, List, Option, Runtime } from ".";

describe("Runtime", () => {
  describe("nullable", () => {
    test.each`
      a                  | name         | lefts          | rights
      ${Runtime.boolean} | ${"boolean"} | ${[1, "a"]}    | ${[true, false]}
      ${Runtime.number}  | ${"number"}  | ${["a", true]} | ${[1, -50]}
      ${Runtime.string}  | ${"string"}  | ${[1, true]}   | ${["a", ""]}
    `("nullable($name)", ({ a, lefts, rights }) => {
      const decodeValues = List.map(Runtime.decode(Runtime.nullable(a)));
      const rightsWithMaybes: ReadonlyArray<Option.Nullable<any>> = [
        ...rights,
        null,
        undefined
      ];

      expect(List.rights(decodeValues(lefts)).length).toEqual(0);
      expect(List.lefts(decodeValues(rightsWithMaybes)).length).toEqual(0);
    });
  });

  describe("fromPredicate", () => {
    test.each`
      name          | predicate                                               | left    | right
      ${"strings"}  | ${(a: unknown): a is string => typeof a === "string"}   | ${1}    | ${"a"}
      ${"numbers"}  | ${(a: unknown): a is number => typeof a === "number"}   | ${"b"}  | ${2}
      ${"booleans"} | ${(a: unknown): a is boolean => typeof a === "boolean"} | ${null} | ${true}
    `("`fromPredicate` for $name", ({ name, predicate, left, right }) => {
      const decode = Runtime.decode(Runtime.fromPredicate(name, predicate));
      expect(Either.isLeft(decode(left))).toEqual(true);
      expect(Either.isRight(decode(right))).toEqual(true);
    });
  });
});
