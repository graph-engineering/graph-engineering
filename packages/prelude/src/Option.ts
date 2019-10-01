export * from "fp-ts/lib/Option";
import * as Apply from "fp-ts/lib/Apply";
import * as Option from "fp-ts/lib/Option";

import { chainFrom } from ".";

export const chained = chainFrom(Option.option);
export const fromRecord = Apply.sequenceS(Option.option);
export const fromTuple = Apply.sequenceT(Option.option);
