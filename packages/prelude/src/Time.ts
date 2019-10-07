import * as IO from "fp-ts/lib/IO";

export type Time = number;

export const millisecond: Time = 1;
export const second: Time = millisecond * 1000;
export const minute: Time = second * 60;
export const hour: Time = minute * 60;
export const day: Time = hour * 24;

export const now: IO.IO<Time> = () => new Date().valueOf();
