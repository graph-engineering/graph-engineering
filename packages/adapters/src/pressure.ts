import { makeSimpleUnitAdapter } from "./utils/simple-unit-adapter-creator";

export const pressures = {
  pascals: 1,
  bars: 100000,
  atmospheres: 101325.01,
  poundsPerSquareInch: 6894.76,
  poundsPerSquareFoot: 47.880258888889,
  torr: 133.32236842105
};

export const makeAdapter = makeSimpleUnitAdapter(pressures, "PressureAdapter");
