import { makeSimpleUnitTypes } from "./utils/simple-unit-creator";

const ratio = 235.2145833;
const convert = (num: number): number => (num === 0 ? 0 : ratio / num);

export const relationships = {
  litersPer100KM: 1,
  milesPerGallon: {
    fromBaseUnit: convert,
    toBaseUnit: convert
  }
};

const FuelEfficiency = makeSimpleUnitTypes(relationships, "FuelEfficiency");
export default FuelEfficiency;
