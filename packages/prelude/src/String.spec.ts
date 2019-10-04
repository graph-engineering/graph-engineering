import * as String from "./String";

describe("String", () => {
  test.each`
    a      | b                        | expected
    ${"-"} | ${["a", "b", "c"]}       | ${"a-b-c"}
    ${" "} | ${["1", "2", "3"]}       | ${"1 2 3"}
    ${""}  | ${["foo", "bar", "baz"]} | ${"foobarbaz"}
  `("String.join($a)($b) === $expected", ({ a, b, expected }) => {
    expect(String.join(a)(b)).toEqual(expected);
  });
});
