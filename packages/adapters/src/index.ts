import { printType } from "graphql";
import gql from "graphql-tag";

import * as Distance from "./distance";
import { RoundingDirectionEnum } from "./utils/basic-rounder";

const distanceAdapter = Distance.makeAdapter();

export const typeDefs = gql`
  ${distanceAdapter.typeDefs}
  ${printType(RoundingDirectionEnum)}
`;

export const resolvers = {
  DistanceAdapter: distanceAdapter.resolvers
};
