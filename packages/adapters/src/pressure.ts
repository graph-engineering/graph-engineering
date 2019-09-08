import { createSimpleUnitModule } from "./utils/simple-unit-module-creator";

export const pressures = {
  defaultAdapterName: "PressureAdapter",
  baseUnit: "pascals" as const,
  relationships: {
    pascals: 1,
    bars: 100000,
    atmospheres: 101325.01,
    poundsPerSquareInch: 6894.76,
    poundsPerSquareFoot: 47.880258888889,
    torr: 133.32236842105
  }
};

const Pressure = createSimpleUnitModule(pressures);
export default Pressure;
