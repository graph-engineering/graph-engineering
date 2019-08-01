import { Array, Error, Option, pipe, Task, TaskEither, These } from ".";

namespace Right {
  export const values = [1, 2, 3];
  export const tasks = pipe(
    values,
    Array.map(result => TaskEither.tryCatchError(() => Promise.resolve(result)))
  );
}

namespace Left {
  export const values = pipe(
    [4, 5, 6],
    Array.map(Error.from)
  );

  export const tasks = pipe(
    values,
    Array.map(result => TaskEither.tryCatchError(() => Promise.reject(result)))
  );
}

describe("`fromTaskEithers`", () => {
  test("returns `Option.none` when given `[]`", async () =>
    expect(await Task.fromTaskEithers([])()).toEqual(Option.none));

  test("returns only `Right`s", async () =>
    expect(await Task.fromTaskEithers(Right.tasks)()).toEqual(
      Option.some(These.right(Right.values))
    ));

  test("returns only `Left`s", async () =>
    expect(await Task.fromTaskEithers(Left.tasks)()).toEqual(
      Option.some(These.left(Left.values))
    ));

  test("returns `Right`s and `Left`s", async () =>
    expect(
      await Task.fromTaskEithers([...Right.tasks, ...Left.tasks])()
    ).toEqual(Option.some(These.both(Left.values, Right.values))));
});
