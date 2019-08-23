import { printType } from "graphql";
import gql from "graphql-tag";

import { RoundingDirectionEnum } from "./basic-rounder";
import * as Distance from "./distance";

const distanceAdapter = Distance.makeDistanceAdapter();

export const typeDefs = gql`
  ${distanceAdapter.typeDefs}
  ${printType(RoundingDirectionEnum)}
`;

export const resolvers = {
  DistanceAdapter: distanceAdapter.resolvers
};
