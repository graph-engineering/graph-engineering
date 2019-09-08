import { makeSimpleUnitTypes } from "./utils/simple-unit-adapter-creator";

export const relationships = {
  celsius: 1,
  fahrenheit: {
    fromBaseUnit: (celsius: number) => celsius * (9 / 5) + 32,
    toBaseUnit: (fahrenheit: number) => (fahrenheit - 32) * (5 / 9)
  },
  kelvin: {
    fromBaseUnit: (celsius: number) => celsius + 273.15,
    toBaseUnit: (kelvin: number) => kelvin - 273.15
  }
};

const Temperature = makeSimpleUnitTypes(relationships, "Temperature");
export default Temperature;
