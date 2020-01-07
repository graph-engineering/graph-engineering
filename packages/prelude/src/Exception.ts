import { JSON, Option } from ".";

export const from = (error?: Option.Nullable<unknown>): Error =>
  !(error instanceof Error)
    ? new Error(`Unknown error...\n\n${JSON.Stringify.Always.pretty(error)}`)
    : error;
