import { createSimpleUnitModule } from "./utils/simple-unit-module-creator";

const ratio = 235.2145833;
const convert = (num: number): number => (num === 0 ? 0 : ratio / num);

export const fuelEfficiencies = {
  defaultAdapterName: "FuelEfficiencyAdapter",
  baseUnit: "litersPer100KM" as const,
  relationships: {
    litersPer100KM: 1,
    milesPerGallon: {
      fromBaseUnit: convert,
      toBaseUnit: convert
    }
  }
};

const FuelEfficiency = createSimpleUnitModule(fuelEfficiencies);
export default FuelEfficiency;
