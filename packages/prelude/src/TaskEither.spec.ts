import { Either, TaskEither } from ".";

describe("TaskEither", () => {
  describe("tryCatchError", () => {
    test("returns `Left` if `Promise` rejects", async () => {
      const result = await TaskEither.tryCatchError(() => Promise.reject())();
      expect(Either.isLeft(result)).toEqual(true);
    });

    test("returns `Right` if `Promise` resolves", async () => {
      const value = "resolves";
      const result = await TaskEither.tryCatchError(() =>
        Promise.resolve(value)
      )();

      expect(Either.isRight(result)).toEqual(true);
      expect(result).toEqual(Either.right(value));
    });
  });

  describe("runUnsafe", () => {
    test("throws if `Left`", async () => {
      try {
        // tslint:disable-next-line: no-expression-statement
        await TaskEither.runUnsafe(TaskEither.left("boom"));
        throw Error("an error should have already been thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    test("returns if `Right`", async () => {
      const value = 123;
      const result = await TaskEither.runUnsafe(TaskEither.right(value));
      expect(result).toEqual(value);
    });
  });
});
