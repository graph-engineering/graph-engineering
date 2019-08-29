import { makeSimpleUnitAdapter } from "./utils/simple-unit-adapter-creator";

export const distances = {
  millimeters: 1,
  centimeters: 10,
  meters: 1000,
  kilometers: 1000000,
  inches: 25.4,
  feet: 304.8,
  yards: 914.4,
  miles: 1609344
};

export const makeAdapter = makeSimpleUnitAdapter(distances, "DistanceAdapter");
