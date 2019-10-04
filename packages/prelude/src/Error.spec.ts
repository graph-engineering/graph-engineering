import { Exception, JSON, List } from ".";

describe("Exception", () => {
  describe("from", () => {
    test("returns default `Error` when given nothing", () => {
      const error = Exception.from();
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBeDefined();
    });

    test("returns unchanged `Error` when given an `Error`", () => {
      const error = Error("this should be unchanged");
      expect(Exception.from(error)).toEqual(error);
    });

    test("returns `Error` with message from a given `string`", () => {
      const message = "this should be the error message";
      expect(Exception.from(message)).toEqual(Error(message));
    });

    test("returns `Error` with details when given `unknown` data", () => {
      const data = { unknown: "what is this?" };
      const error = Exception.from(data);
      expect(error.message).toMatch(JSON.Stringify.Always.pretty(data));
    });
  });

  describe("fromL", () => {
    test("returns function which returns an `Error`", () => {
      const error = Exception.from("some error message");
      expect(Exception.fromL(error)()).toEqual(error);
    });
  });

  describe("throwL", () => {
    test("returns lazy function which throws an `Error`", () =>
      expect(Exception.throwL()).toThrowError());
  });

  describe("throw", () => {
    test("throws an `Error`", () =>
      expect(() => Exception.throw()).toThrowError());
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
      expect(Exception.detailed(a)).toEqual(expected);
      expect(Exception.detailedL(a)()).toEqual(expected);
    });
  });

  const errors = List.map(Exception.from)([
    "first message",
    "second one",
    "last error"
  ]);

  describe("concat", () => {
    test("returns one `Error` with combined messages when two are given", () => {
      const { message } = Exception.concat(errors[0], errors[1]);
      expect(message).toMatch(errors[0].message);
      expect(message).toMatch(errors[1].message);
    });
  });

  describe("concatAll", () => {
    test("returns one `Error` when many are given", () => {
      const { message } = Exception.concatAll(errors);
      expect(message).toMatch(errors[0].message);
      expect(message).toMatch(errors[1].message);
      expect(message).toMatch(errors[2].message);
    });
  });
});
