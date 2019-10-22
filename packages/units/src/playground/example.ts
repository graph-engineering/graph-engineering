import gql from "graphql-tag";

import { Resolvers } from "../../GeneratedCode";

export const typeDefs = gql`
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
    date(input: DateInput!): DateOutput!
  }
`;

export const resolvers: Resolvers = {
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
    duration: (_, args) => args.input,
    date: (_, args) => args.input
  }
};
