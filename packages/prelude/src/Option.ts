import { Apply, chainFrom, Option } from ".";

export * from "fp-ts/lib/Option";

export type Nullable<A> = A | null | undefined;

export const chained = () => chainFrom(Option.option);
export const fromRecord = () => Apply.sequenceS(Option.option);
export const fromTuple = () => Apply.sequenceT(Option.option);
