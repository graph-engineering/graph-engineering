import { Either, Error, Fn, pipe } from "@grapheng/prelude";

import { flexibleCalculator } from "../utils/flexible-calculator";
import {
  makeSimpleUnitAdapterGenerator,
  SimpleUnitAdapter,
  SimpleUnitAdapterConfig
} from "../utils/simple-unit-adapter-creator";
import {
  AllRelationships,
  RatioTableWithNumbersOrRelationshipFunctions
} from "../utils/types";

export interface SimpleUnitModule<T extends MakeSimpleUnitModuleConfig> {
  readonly fromInput: (
    // TODO: ideally, the partial type here would require at least one property
    input: Partial<AllRelationships<T["relationships"]>>
  ) => AllRelationships<T["relationships"]>;
  readonly makeAdapter: (
    config?: SimpleUnitAdapterConfig<T["relationships"]>
  ) => SimpleUnitAdapter;
  // tslint:disable-next-line:no-mixed-interface
  readonly baseUnit: T["baseUnit"];
}

interface MakeSimpleUnitModuleConfig {
  readonly defaultAdapterName: string;
  readonly baseUnit: keyof RatioTableWithNumbersOrRelationshipFunctions; // TODO: should be key of relationships
  readonly relationships: RatioTableWithNumbersOrRelationshipFunctions;
}

// TODO: make tests
export const createSimpleUnitModule = <T extends MakeSimpleUnitModuleConfig>(
  config: T
): SimpleUnitModule<T> => ({
  // tslint:disable-next-line:no-object-literal-type-assertion
  makeAdapter: makeSimpleUnitAdapterGenerator<T["relationships"]>(
    config.relationships,
    config.defaultAdapterName
  ),
  fromInput: input =>
    pipe(
      flexibleCalculator(input, config.relationships),
      Either.fold(Error.throw, Fn.identity)
    ),
  baseUnit: config.baseUnit
});
