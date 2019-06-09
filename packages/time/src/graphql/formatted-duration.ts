import {
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  printType
} from "graphql";
import Moment from "moment-timezone";

import GraphengMS from "./ms";
import { extractResolvers } from "./utils";

type Duration = Moment.Duration;

export const FormattedDuration = new GraphQLObjectType({
  name: "FormattedDuration",
  fields: () => ({
    humanized: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (duration: Duration) => duration.humanize()
    },
    milliseconds: {
      type: new GraphQLNonNull(GraphengMS),
      resolve: (duration: Duration) => duration.asMilliseconds()
    },
    seconds: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: (duration: Duration) => duration.asSeconds()
    },
    minutes: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: (duration: Duration) => duration.asMinutes()
    },
    hours: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: (duration: Duration) => duration.asHours()
    },
    days: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: (duration: Duration) => duration.asDays()
    },
    weeks: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: (duration: Duration) => duration.asWeeks()
    },
    months: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: (duration: Duration) => duration.asMonths()
    },
    years: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: (duration: Duration) => duration.asYears()
    }
  })
});

export const resolvers = extractResolvers(FormattedDuration);

export const typeDefs = printType(FormattedDuration);
