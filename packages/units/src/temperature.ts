import {
  makeInputConverter,
  makeNumberTableAsFunctions,
  NumberObj,
  PartialWithNulls
} from "./utils/helpers";
import { makeSimpleUnitTypes } from "./utils/simple-unit-creator";

const relationships = makeNumberTableAsFunctions({
  celsius: 1,
  fahrenheit: {
    fromBaseUnit: (celsius: number) => celsius * (9 / 5) + 32,
    toBaseUnit: (fahrenheit: number) => (fahrenheit - 32) * (5 / 9)
  },
  kelvin: {
    fromBaseUnit: (celsius: number) => celsius + 273.15,
    toBaseUnit: (kelvin: number) => kelvin - 273.15
  }
});

export const GraphQL = makeSimpleUnitTypes(relationships, "Temperature");
export const convertInput = makeInputConverter(relationships);

export type Temperature = NumberObj<typeof relationships>;
export type TemperatureInput = PartialWithNulls<Temperature>;
