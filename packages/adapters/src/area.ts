import { createSimpleUnitModule } from "./utils/simple-unit-module-creator";

export const areas = {
  defaultAdapterName: "AreaAdapter",
  baseUnit: "squareMeters" as const,
  relationships: {
    squareMeters: 1,
    squareKilometers: 1000000,
    hectares: 10000,
    squareMiles: 2590000,
    acres: 4046.86,
    squareInches: 0.00064516,
    squareFeet: 0.092903,
    squareYards: 0.836127
  }
};

const Area = createSimpleUnitModule(areas);
export default Area;
