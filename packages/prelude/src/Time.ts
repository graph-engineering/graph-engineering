import convertUnsafe from "ms";

import { Either, Exception } from ".";

export type Date = number;
export type Time = number;
export type English = string;

export const millisecond: Time = 1;
export const second: Time = millisecond * 1000;
export const minute: Time = second * 60;
export const hour: Time = minute * 60;
export const day: Time = hour * 24;

export const toEnglishShort = (time: Time): Either.ErrorOr<English> =>
  Either.tryCatch(() => convertUnsafe(time), Exception.unknown);

export const toEnglishLong = (time: Time): Either.ErrorOr<English> =>
  Either.tryCatch(() => convertUnsafe(time, { long: true }), Exception.unknown);

export const fromEnglish = (english: English): Either.ErrorOr<Time> =>
  Either.tryCatch(() => convertUnsafe(english), Exception.unknown).refineOrElse(
    (time: Time): time is Time =>
      time !== undefined &&
      time !== null &&
      !Number.isNaN(time) &&
      Number.isFinite(time),

    Error(`\`${english}\` cannot be converted into milliseconds`)
  );
