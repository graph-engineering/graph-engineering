import { createSimpleUnitModule } from "./utils/simple-unit-module-creator";

export const config = {
  defaultAdapterName: "TemperatureAdapter",
  baseUnit: "celsius" as const,
  relationships: {
    celsius: 1,
    fahrenheit: {
      fromBaseUnit: (celsius: number) => celsius * (9 / 5) + 32,
      toBaseUnit: (fahrenheit: number) => (fahrenheit - 32) * (5 / 9)
    },
    kelvin: {
      fromBaseUnit: (celsius: number) => celsius + 273.15,
      toBaseUnit: (kelvin: number) => kelvin - 273.15
    }
  }
};

const Temperature = createSimpleUnitModule(config);
export default Temperature;
