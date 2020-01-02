import {
  makeInputConverter,
  makeNumberTableAsFunctions,
  NumberObj,
  PartialWithNulls
} from "./utils/helpers";
import { makeSimpleUnitTypes } from "./utils/simple-unit-creator";

const relationships = makeNumberTableAsFunctions({
  pascals: 1,
  bars: 100000,
  atmospheres: 101325.01,
  poundsPerSquareInch: 6894.76,
  poundsPerSquareFoot: 47.880258888889,
  torr: 133.32236842105
});

export const GraphQL = makeSimpleUnitTypes(relationships, "Pressure");
export const convertInput = makeInputConverter(relationships);

export type Pressure = NumberObj<typeof relationships>;
export type PressureInput = PartialWithNulls<Pressure>;
