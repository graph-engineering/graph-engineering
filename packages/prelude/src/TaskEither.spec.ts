import { Either, TaskEither } from ".";

const taskFail = TaskEither.fromEither(Either.left(Error("fail")));
const mockTaskFail = jest.fn();
mockTaskFail.mockReturnValue(taskFail);

const taskOk = TaskEither.fromEither(Either.right(true));
const mockTaskOk = jest.fn();
mockTaskOk.mockReturnValue(taskOk);

describe(`retry`, () => {
  test("retries `attemptsLeft` times", async () => {
    await TaskEither.retry(mockTaskFail, 3)(taskFail)();
    expect(mockTaskFail).toBeCalledTimes(3);
  });
  test("does not retry if task is ok", async () => {
    await TaskEither.retry(mockTaskOk, 1)(taskOk)();
    expect(mockTaskOk).toBeCalledTimes(0);
  });
  test("retries if original task is left", async () => {
    await TaskEither.retry(mockTaskOk, 3)(taskFail)();
    expect(mockTaskOk).toBeCalledTimes(1);
  });
});
