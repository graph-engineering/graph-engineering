import {
  makeInputConverter,
  makeNumberTableAsFunctions,
  NumberObj
} from "./utils/helpers";
import { makeSimpleUnitTypes } from "./utils/simple-unit-creator";

const relationships = makeNumberTableAsFunctions({
  metersPerSecond: 1,
  kilometersPerHour: 0.277778,
  milesPerHour: 0.44704,
  knots: 0.514444855556
});

export const GraphQL = makeSimpleUnitTypes(relationships, "Velocity");
export const convertInput = makeInputConverter(relationships);

export type Velocity = NumberObj<typeof relationships>;
export type VelocityInput = Partial<Velocity>;
