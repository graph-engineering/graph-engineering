import {
  makeInputConverter,
  makeNumberTableAsFunctions,
  NumberObj
} from "./utils/helpers";
import { makeSimpleUnitTypes } from "./utils/simple-unit-creator";

const ratio = 235.2145833;
const convert = (num: number): number => (num === 0 ? 0 : ratio / num);

const relationships = makeNumberTableAsFunctions({
  litersPer100KM: 1,
  milesPerGallon: {
    fromBaseUnit: convert,
    toBaseUnit: convert
  }
});

export const GraphQL = makeSimpleUnitTypes(relationships, "FuelEfficiency");
export const convertInput = makeInputConverter(relationships);

export type FuelEfficiency = NumberObj<typeof relationships>;
export type FuelEfficiencyInput = Partial<FuelEfficiency>;
