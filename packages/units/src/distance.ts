import {
  makeInputConverter,
  makeNumberTableAsFunctions,
  NumberObj
} from "./utils/helpers";
import { makeSimpleUnitTypes } from "./utils/simple-unit-creator";

const relationships = makeNumberTableAsFunctions({
  millimeters: 1,
  centimeters: 10,
  meters: 1000,
  kilometers: 1000000,
  inches: 25.4,
  feet: 304.8,
  yards: 914.4,
  miles: 1609344
});

export const GraphQL = makeSimpleUnitTypes(relationships, "Distance");
export const convertInput = makeInputConverter(relationships);

export type Distance = NumberObj<typeof relationships>;
export type DistanceInput = Partial<Distance>;
