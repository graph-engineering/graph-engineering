import { ApolloServer } from "apollo-server";
import gql from "graphql-tag";
import { makeExecutableSchema } from "graphql-tools";

import * as Adapters from ".";

const schema = makeExecutableSchema({
  typeDefs: gql`
    ${Adapters.allTypeDefs}

    type Query {
      angle(input: AngleAdapterInput!): AngleAdapter!
      area(input: AreaAdapterInput!): AreaAdapter!
      fuelEfficiency(input: FuelEfficiencyAdapterInput!): FuelEfficiencyAdapter!
      pressure(input: PressureAdapterInput!): PressureAdapter!
      temperature(input: TemperatureAdapterInput!): TemperatureAdapter!
      distance(input: DistanceAdapterInput!): DistanceAdapter!
      velocity(input: VelocityAdapterInput!): VelocityAdapter!
      volume(input: VolumeAdapterInput!): VolumeAdapter!
      weight(input: WeightAdapterInput!): WeightAdapter!
    }
  `,
  resolvers: {
    ...Adapters.allResolvers,
    Query: {
      angle: (_, args) =>
        Adapters.Angle.fromInput(args.input)[Adapters.Angle.baseUnit],
      area: (_, args) =>
        Adapters.Area.fromInput(args.input)[Adapters.Area.baseUnit],
      fuelEfficiency: (_, args) =>
        Adapters.FuelEfficiency.fromInput(args.input)[
          Adapters.FuelEfficiency.baseUnit
        ],
      pressure: (_, args) =>
        Adapters.Pressure.fromInput(args.input)[Adapters.Pressure.baseUnit],
      temperature: (_, args) =>
        Adapters.Temperature.fromInput(args.input)[
          Adapters.Temperature.baseUnit
        ],
      distance: (_, args) =>
        Adapters.Distance.fromInput(args.input)[Adapters.Distance.baseUnit],
      velocity: (_, args) =>
        Adapters.Velocity.fromInput(args.input)[Adapters.Velocity.baseUnit],
      volume: (_, args) =>
        Adapters.Volume.fromInput(args.input)[Adapters.Volume.baseUnit],
      weight: (_, args) =>
        Adapters.Weight.fromInput(args.input)[Adapters.Weight.baseUnit]
    }
  }
});

// tslint:disable
new ApolloServer({ schema }).listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
// tslint:enable
