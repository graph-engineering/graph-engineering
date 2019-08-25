import { printType } from "graphql";
import gql from "graphql-tag";

import { RoundingDirectionEnum } from "./utils/basic-rounder";

import * as Area from "./area";
import * as Distance from "./distance";
import * as Pressure from "./pressure";
import * as Velocity from "./velocity";
import * as Volume from "./volume";

const distanceAdapter = Distance.makeAdapter();
const pressureAdapter = Pressure.makeAdapter();
const velocityAdapter = Velocity.makeAdapter();
const volumeAdapter = Volume.makeAdapter();
const areaAdapter = Area.makeAdapter();

export const typeDefs = gql`
  ${printType(RoundingDirectionEnum)}

  ${distanceAdapter.typeDefs}
  ${pressureAdapter.typeDefs}
  ${velocityAdapter.typeDefs}
  ${volumeAdapter.typeDefs}
  ${areaAdapter.typeDefs}
`;

export const resolvers = {
  DistanceAdapter: distanceAdapter.resolvers,
  PressureAdapter: pressureAdapter.resolvers,
  VelocityAdapter: velocityAdapter.resolvers,
  VolumeAdapter: volumeAdapter.resolvers,
  AreaAdapter: areaAdapter.resolvers
};
