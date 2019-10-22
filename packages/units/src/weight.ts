import {
  makeInputConverter,
  makeNumberTableAsFunctions,
  NumberObj
} from "./utils/helpers";
import { makeSimpleUnitTypes } from "./utils/simple-unit-creator";

// NOTE: terrestrial weight: i.e. a practical weight that is generally relevant to humans on Earth

const relationships = makeNumberTableAsFunctions({
  milligrams: 1,
  grams: 1000,
  kilograms: 1000000,
  metricTons: 1000000000,
  ounces: 28349.5,
  pounds: 453592,
  tons: 907184000
});

export const GraphQL = makeSimpleUnitTypes(relationships, "Weight");
export const convertInput = makeInputConverter(relationships);

export type Weight = NumberObj<typeof relationships>;
export type WeightInput = Partial<Weight>;
