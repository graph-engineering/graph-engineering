import { makeSimpleUnitTypes } from "./utils/simple-unit-adapter-creator";

export const relationships = {
  squareMeters: 1,
  squareKilometers: 1000000,
  hectares: 10000,
  squareMiles: 2590000,
  acres: 4046.86,
  squareInches: 0.00064516,
  squareFeet: 0.092903,
  squareYards: 0.836127
};

const Area = makeSimpleUnitTypes(relationships, "Area");
export default Area;
