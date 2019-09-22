import { makeSimpleUnitTypes } from "./utils/simple-unit-creator";

export const relationships = {
  milliliters: 1,
  liters: 1000,
  cubicMeters: 1000000,
  cubicInches: 16.387064,
  cubicFeet: 28316.846592,
  pints: 473.176473,
  quarts: 946.352946,
  gallons: 3785.411784,
  cups: 240,
  tablespoons: 16.2307,
  teaspoons: 48.6922
};

const Volume = makeSimpleUnitTypes(relationships, "Volume");
export default Volume;
