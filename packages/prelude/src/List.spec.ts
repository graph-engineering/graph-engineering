import * as List from "./List";

describe("List", () => {
  const booleans: readonly boolean[] = [true, false];
  const numbers: readonly number[] = [1, 2, 3];
  const strings: readonly string[] = ["a", "b", "c"];
  const objects: readonly object[] = [{ a: 1 }, { a: "2" }, { b: true }];
  const mixed: readonly (boolean | number | string | object)[] = [
    ...booleans,
    ...numbers,
    ...strings,
    ...objects
  ];

  describe("is", () => {
    test.each`
      a           | expected
      ${booleans} | ${true}
      ${numbers}  | ${true}
      ${strings}  | ${true}
      ${objects}  | ${true}
      ${mixed}    | ${true}
      ${true}     | ${false}
      ${1}        | ${false}
      ${"a"}      | ${false}
      ${{ a: 2 }} | ${false}
    `("is($a) === $expected", ({ a, expected }) =>
      expect(List.is(a)).toEqual(expected)
    );
  });

  test("empty", () => expect(List.empty()).toEqual([]));

  describe("from", () => {
    test.each`
      a           | expected
      ${booleans} | ${[booleans]}
      ${numbers}  | ${[numbers]}
      ${strings}  | ${[strings]}
      ${objects}  | ${[objects]}
      ${mixed}    | ${[mixed]}
      ${true}     | ${[true]}
      ${1}        | ${[1]}
      ${"a"}      | ${["a"]}
      ${{ a: 2 }} | ${[{ a: 2 }]}
    `("from($a) === $expected", ({ a, expected }) =>
      expect(List.from(a)).toEqual(expected)
    );
  });

  describe("nonNullables", () => {
    test.each`
      a                                      | expected
      ${[null, ...booleans, undefined]}      | ${booleans}
      ${[null, null, undefined, ...numbers]} | ${numbers}
      ${[undefined, ...strings, null, null]} | ${strings}
      ${[undefined, ...objects, null]}       | ${objects}
      ${[null, undefined, ...mixed, null]}   | ${mixed}
    `("nonNullables($a) === $expected", ({ a, expected }) =>
      expect(List.nonNullables(a)).toEqual(expected)
    );
  });
});
