import { Either } from ".";
export declare type Date = number;
export declare type Time = number;
export declare type English = string;
export declare const millisecond: Time;
export declare const second: Time;
export declare const minute: Time;
export declare const hour: Time;
export declare const day: Time;
export declare const toEnglishShort: (
  time: number
) => Either.Either<Error, string>;
export declare const toEnglishLong: (
  time: number
) => Either.Either<Error, string>;
export declare const fromEnglish: (
  english: string
) => Either.Either<Error, number>;
