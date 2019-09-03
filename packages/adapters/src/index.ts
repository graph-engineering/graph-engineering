import { printType } from "graphql";
import gql from "graphql-tag";

import { RoundingDirectionEnum } from "./utils/basic-rounder";

import * as Area from "./area";
import * as Distance from "./distance";
import * as Pressure from "./pressure";
import * as Velocity from "./velocity";
import * as Volume from "./volume";

export const distanceAdapter = Distance.makeAdapter();
const pressureAdapter = Pressure.makeAdapter();
const velocityAdapter = Velocity.makeAdapter();
const volumeAdapter = Volume.makeAdapter();
const areaAdapter = Area.makeAdapter();

export const typeDefs = gql`
  ${printType(RoundingDirectionEnum)}

  ${distanceAdapter.outputType.typeDefs}
  ${pressureAdapter.outputType.typeDefs}
  ${velocityAdapter.outputType.typeDefs}
  ${volumeAdapter.outputType.typeDefs}
  ${areaAdapter.outputType.typeDefs}
`;

export const resolvers = {
  DistanceAdapter: distanceAdapter.outputType.resolvers,
  PressureAdapter: pressureAdapter.outputType.resolvers,
  VelocityAdapter: velocityAdapter.outputType.resolvers,
  VolumeAdapter: volumeAdapter.outputType.resolvers,
  AreaAdapter: areaAdapter.outputType.resolvers
};
