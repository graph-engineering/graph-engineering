import convertUnsafe from "ms";

import { pipe } from ".";
import * as Either from "./Either";
import * as Error from "./Error";

export type Time = number;

export const millisecond: Time = 1;
export const second: Time = millisecond * 1000;
export const minute: Time = second * 60;
export const hour: Time = minute * 60;
export const day: Time = hour * 24;

export const now = (): Time => new Date().valueOf();

export namespace English {
  export type English = string;

  export namespace FromTime {
    export const short = (time: Time): Either.ErrorOr<English> =>
      Either.tryCatchError(() => convertUnsafe(time));

    export const long = (time: Time): Either.ErrorOr<English> =>
      Either.tryCatchError(() => convertUnsafe(time, { long: true }));
  }

  export const toTime = (english: English): Either.ErrorOr<Time> =>
    pipe(
      Either.tryCatchError(() => convertUnsafe(english)),
      Either.filterOrElse(
        (time: Time): time is Time =>
          time !== undefined &&
          time !== null &&
          !Number.isNaN(time) &&
          Number.isFinite(time),
        Error.fromL(`\`${english}\` cannot be converted into milliseconds`)
      )
    );
}
