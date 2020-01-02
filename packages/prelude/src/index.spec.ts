import { equal, hole, identity, notEqual, spy } from ".";

type ComplicatedRecord = {
  readonly boolean: true;
  readonly number: 1;
  readonly string: "a";
  readonly function: () => any;
  readonly object: { readonly sup: "my dude" };
  readonly array: readonly (boolean | 1 | "trash" | "anything, really")[];
};

// tslint:enable

// tslint:disable-next-line: no-expression-statement no-object-mutation no-console
console.log = jest.fn();

describe("hole", () => {
  test("inference", () =>
    expect(
      (): ComplicatedRecord => ({
        boolean: hole(),
        number: hole(),
        string: hole(),
        function: hole(),
        object: hole(),
        array: hole()
      })
    ).toThrow());

  test("isn't actually defined", () => expect(() => hole()).toThrow());
});

describe("spy", () => {
  test("inference", () =>
    expect(() => (): ComplicatedRecord => ({
      boolean: spy(true),
      number: spy(1),
      string: spy("a"),
      function: spy(() => 1),
      object: spy({ sup: "my dude" }),
      array: spy([])
    })).toBeDefined());

  test.each`
    a
    ${true}
    ${1}
    ${"a"}
  `("spy($a) === $a", ({ a }) => expect(spy(a)).toEqual(a));
});

describe("equal", () => {
  test.each`
    a       | b        | expected
    ${true} | ${true}  | ${true}
    ${true} | ${false} | ${false}
    ${1}    | ${1}     | ${true}
    ${1}    | ${2}     | ${false}
    ${"a"}  | ${"a"}   | ${true}
    ${"a"}  | ${"b"}   | ${false}
  `("equal($a)($b) === $expected", ({ a, b, expected }) =>
    expect(equal(a)(b)).toEqual(expected)
  );
});

describe("notEqual", () => {
  test.each`
    a       | b        | expected
    ${true} | ${true}  | ${false}
    ${true} | ${false} | ${true}
    ${1}    | ${1}     | ${false}
    ${1}    | ${2}     | ${true}
    ${"a"}  | ${"a"}   | ${false}
    ${"a"}  | ${"b"}   | ${true}
  `("notEqual($a)($b) === $expected", ({ a, b, expected }) =>
    expect(notEqual(a)(b)).toEqual(expected)
  );
});

describe("identity", () => {
  test.each`
    a       | expected
    ${true} | ${true}
    ${1}    | ${1}
    ${"a"}  | ${"a"}
  `("identity($a) === $expected", ({ a, expected }) =>
    expect(identity(a)).toEqual(expected)
  );
});
