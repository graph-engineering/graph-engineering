import { Array, Error, JSON } from ".";

describe("Error", () => {
  describe("from", () => {
    test("returns default `Error` when given nothing", () => {
      const error = Error.from();
      expect(error).toBeInstanceOf(Error.Error);
      expect(error.message).toBeDefined();
    });

    test("returns unchanged `Error` when given an `Error`", () => {
      const error = Error.Error("this should be unchanged");
      expect(Error.from(error)).toEqual(error);
    });

    test("returns `Error` with message from a given `string`", () => {
      const message = "this should be the error message";
      expect(Error.from(message)).toEqual(Error.Error(message));
    });

    test("returns `Error` with details when given `unknown` data", () => {
      const data = { unknown: "what is this?" };
      const error = Error.from(data);
      expect(error.message).toMatch(JSON.Stringify.Always.pretty(data));
    });
  });

  describe("fromL", () => {
    test("returns function which returns an `Error`", () => {
      const error = Error.from("some error message");
      expect(Error.fromL(error)()).toEqual(error);
    });
  });

  describe("throwL", () => {
    test("returns lazy function which throws an `Error`", () =>
      expect(Error.throwL()).toThrowError());
  });

  describe("throw", () => {
    test("throws an `Error`", () => expect(() => Error.throw()).toThrowError());
  });

  describe("detailed", () => {
    const unknownMessage = "An unknown error occurred";
    const unknownMessageWithDetails = (details: unknown) =>
      `${unknownMessage}...\n\n${JSON.Stringify.Always.pretty(details)}`;

    test.each`
      a                                         | expected
      ${Error.Error("error")}                   | ${Error.Error("error")}
      ${null}                                   | ${Error.Error(unknownMessage)}
      ${undefined}                              | ${Error.Error(unknownMessage)}
      ${true}                                   | ${Error.Error(unknownMessageWithDetails(true))}
      ${1}                                      | ${Error.Error(unknownMessageWithDetails(1))}
      ${"a"}                                    | ${Error.Error("a")}
      ${{ some: "object" }}                     | ${Error.Error(unknownMessageWithDetails({ some: "object" }))}
      ${{ some: { bigger: { object: null } } }} | ${Error.Error(unknownMessageWithDetails({ some: { bigger: { object: null } } }))}
    `("detailed($a) === detailedL($a)() === $expected", ({ a, expected }) => {
      expect(Error.detailed(a)).toEqual(expected);
      expect(Error.detailedL(a)()).toEqual(expected);
    });
  });

  const errors = Array.map(Error.from)([
    "first message",
    "second one",
    "last error"
  ]);

  describe("concat", () => {
    test("returns one `Error` with combined messages when two are given", () => {
      const { message } = Error.concat(errors[0], errors[1]);
      expect(message).toMatch(errors[0].message);
      expect(message).toMatch(errors[1].message);
    });
  });

  describe("concatAll", () => {
    test("returns one `Error` when many are given", () => {
      const { message } = Error.concatAll(errors);
      expect(message).toMatch(errors[0].message);
      expect(message).toMatch(errors[1].message);
      expect(message).toMatch(errors[2].message);
    });
  });
});
