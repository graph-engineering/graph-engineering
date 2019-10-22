import { Angle } from ".";
import {
  makeInputConverter,
  makeNumberTableAsFunctions,
  NumberObj,
  PartialWithNulls
} from "./utils/helpers";
import { makeSimpleUnitTypes } from "./utils/simple-unit-creator";

const relationships = makeNumberTableAsFunctions({
  radians: 1,
  milliradians: 0.001,
  degrees: {
    fromBaseUnit: (radians: number) => radians * (180 / Math.PI),
    toBaseUnit: (degrees: number) => degrees * (Math.PI / 180)
  },
  gradians: {
    fromBaseUnit: (radians: number) => radians * (200 / Math.PI),
    toBaseUnit: (gradians: number) => gradians * (Math.PI / 200)
  },
  arcMinutes: {
    fromBaseUnit: (radians: number) => radians * (10800 / Math.PI),
    toBaseUnit: (arcMinutes: number) => arcMinutes * (Math.PI / 10800)
  },
  arcSeconds: {
    fromBaseUnit: (radians: number) => radians * (648000 / Math.PI),
    toBaseUnit: (arcSeconds: number) => arcSeconds * (Math.PI / 648000)
  }
});

export const GraphQL = makeSimpleUnitTypes(relationships, "Angle");
export const convertInput = makeInputConverter(relationships);

export type Angle = NumberObj<typeof relationships>;
export type AngleInput = PartialWithNulls<Angle>;
