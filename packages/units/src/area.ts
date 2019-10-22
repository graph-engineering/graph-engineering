import {
  makeInputConverter,
  makeNumberTableAsFunctions,
  NumberObj
} from "./utils/helpers";
import { makeSimpleUnitTypes } from "./utils/simple-unit-creator";

const relationships = makeNumberTableAsFunctions({
  squareMeters: 1,
  squareKilometers: 1000000,
  hectares: 10000,
  squareMiles: 2590000,
  acres: 4046.86,
  squareInches: 0.00064516,
  squareFeet: 0.092903,
  squareYards: 0.836127
});

export const GraphQL = makeSimpleUnitTypes(relationships, "Area");
export const convertInput = makeInputConverter(relationships);

export type Area = NumberObj<typeof relationships>;
export type AreaInput = Partial<Area>;
