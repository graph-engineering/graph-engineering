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

export const config = {
  defaultAdapterName: "DurationAdapter",
  baseUnit: "milliseconds" as const
};

export const FormattedDuration = new GraphQLObjectType({
  name: "FormattedDuration",
  fields: () => ({
    humanized: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (millis: Duration) => Moment.duration(millis).humanize()
    },
    milliseconds: {
      type: new GraphQLNonNull(GraphengMS),
      resolve: (millis: Duration) => Moment.duration(millis).asMilliseconds()
    },
    seconds: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: (millis: Duration) => Moment.duration(millis).asSeconds()
    },
    minutes: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: (millis: Duration) => Moment.duration(millis).asMinutes()
    },
    hours: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: (millis: Duration) => Moment.duration(millis).asHours()
    },
    days: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: (millis: Duration) => Moment.duration(millis).asDays()
    },
    weeks: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: (millis: Duration) => Moment.duration(millis).asWeeks()
    },
    months: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: (millis: Duration) => Moment.duration(millis).asMonths()
    },
    years: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: (millis: Duration) => Moment.duration(millis).asYears()
    }
  })
});

export const resolvers = extractResolvers(FormattedDuration);

export const typeDefs = printType(FormattedDuration);
