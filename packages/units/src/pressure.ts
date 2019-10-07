import { makeSimpleUnitTypes } from "./utils/simple-unit-creator";

export const relationships = {
  pascals: 1,
  bars: 100000,
  atmospheres: 101325.01,
  poundsPerSquareInch: 6894.76,
  poundsPerSquareFoot: 47.880258888889,
  torr: 133.32236842105
};

const Pressure = makeSimpleUnitTypes(relationships, "Pressure");
export default Pressure;
