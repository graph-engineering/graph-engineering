import { ApolloServer } from "apollo-server";
import gql from "graphql-tag";
import { makeExecutableSchema } from "graphql-tools";

import * as Units from ".";

const schema = makeExecutableSchema({
  typeDefs: gql`
    ${Units.allTypeDefs}

    type Query {
      angle(input: AngleInput!): AngleOutput!
      area(input: AreaInput!): AreaOutput!
      fuelEfficiency(input: FuelEfficiencyInput!): FuelEfficiencyOutput!
      pressure(input: PressureInput!): PressureOutput!
      temperature(input: TemperatureInput!): TemperatureOutput!
      distance(input: DistanceInput!): DistanceOutput!
      velocity(input: VelocityInput!): VelocityOutput!
      volume(input: VolumeInput!): VolumeOutput!
      weight(input: WeightInput!): WeightOutput!
      duration(input: DurationInput!): DurationOutput!
    }
  `,
  resolvers: {
    ...Units.allResolvers,
    Query: {
      angle: (_, args) => args.input,
      area: (_, args) => args.input,
      fuelEfficiency: (_, args) => args.input,
      pressure: (_, args) => args.input,
      temperature: (_, args) => args.input,
      distance: (_, args) => args.input,
      velocity: (_, args) => args.input,
      volume: (_, args) => args.input,
      weight: (_, args) => args.input,
      duration: (_, args) => args.input
    }
  }
});

// tslint:disable
new ApolloServer({ schema }).listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
// tslint:enable
