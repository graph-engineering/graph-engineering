import { ApolloServer } from "apollo-server";
import gql from "graphql-tag";
import { makeExecutableSchema } from "graphql-tools";

import * as AllTypes from ".";

const schema = makeExecutableSchema({
  typeDefs: gql`
    ${AllTypes.typeDefs}

    type Query {
      distance(millimetersInput: Float!): DistanceAdapter!
      pressure(pascalsInput: Float!): PressureAdapter!
      velocity(metersPerSecondInput: Float!): VelocityAdapter!
      volume(millilitersInput: Float!): VolumeAdapter!
      area(squareMetersInput: Float!): AreaAdapter!
    }
  `,
  resolvers: {
    ...AllTypes.resolvers,
    Query: {
      distance: (_, args) => args.millimetersInput,
      pressure: (_, args) => args.pascalsInput,
      velocity: (_, args) => args.metersPerSecondInput,
      volume: (_, args) => args.millilitersInput,
      area: (_, args) => args.squareMetersInput
    }
  }
});

// tslint:disable
new ApolloServer({ schema }).listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
// tslint:enable
