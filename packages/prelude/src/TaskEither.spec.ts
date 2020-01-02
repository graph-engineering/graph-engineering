import { Either, TaskEither } from ".";

describe("TaskEither", () => {
  describe("tryCatchError", () => {
    test("returns `Left` if `Promise` rejects", async () => {
      const result = await TaskEither.fromTry(() => Promise.reject())();
      expect(Either.isLeft(result)).toEqual(true);
    });

    test("returns `Right` if `Promise` resolves", async () => {
      const value = "resolves";
      const result = await TaskEither.fromTry(() => Promise.resolve(value))();

      expect(Either.isRight(result)).toEqual(true);
      expect(result).toEqual(Either.right(value));
    });
  });
});
