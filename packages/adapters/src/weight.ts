import { makeSimpleUnitAdapter } from "./utils/simple-unit-adapter-creator";

// NOTE: terrestrial weight: i.e. a practical weight that is generally relevant to humans   on Earth

export const weights = {
  milligrams: 1,
  grams: 1000,
  kilograms: 1000000,
  metricTons: 1000000000,
  ounces: 28349.5,
  pounds: 453592,
  tons: 907184000
};

export const makeAdapter = makeSimpleUnitAdapter(weights, "WeightAdapter");
