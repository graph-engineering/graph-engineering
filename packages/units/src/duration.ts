import { pipe, Record } from "@grapheng/prelude";
import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from "graphql";
import Moment from "moment-timezone";

import {
  createGraphQLInputObjectTypeExports,
  createGraphQLObjectTypeExports,
  explodeTypeFromBaseUnit,
  makeFieldsFromSimpleTable,
  makeNumberTableAsFunctions,
  squashToBaseUnit
} from "./utils/helpers";
import { SimpleUnit } from "./utils/simple-unit-creator";
import { StringsToNumbers } from "./utils/types";

const relationships = {
  milliseconds: {
    fromBaseUnit: (millis: number) => millis,
    toBaseUnit: (millis: number) => millis
  },
  seconds: {
    fromBaseUnit: (millis: number) => Moment.duration(millis).asSeconds(),
    toBaseUnit: (seconds: number) =>
      Moment.duration(seconds, "seconds").asMilliseconds()
  },
  minutes: {
    fromBaseUnit: (millis: number) => Moment.duration(millis).asMinutes(),
    toBaseUnit: (minutes: number) =>
      Moment.duration(minutes, "minutes").asMilliseconds()
  },
  hours: {
    fromBaseUnit: (millis: number) => Moment.duration(millis).asHours(),
    toBaseUnit: (hours: number) =>
      Moment.duration(hours, "hours").asMilliseconds()
  },
  days: {
    fromBaseUnit: (millis: number) => Moment.duration(millis).asDays(),
    toBaseUnit: (days: number) => Moment.duration(days, "days").asMilliseconds()
  },
  weeks: {
    fromBaseUnit: (millis: number) => Moment.duration(millis).asWeeks(),
    toBaseUnit: (weeks: number) =>
      Moment.duration(weeks, "weeks").asMilliseconds()
  },
  months: {
    fromBaseUnit: (millis: number) => Moment.duration(millis).asMonths(),
    toBaseUnit: (months: number) =>
      Moment.duration(months, "months").asMilliseconds()
  },
  years: {
    fromBaseUnit: (millis: number) => Moment.duration(millis).asYears(),
    toBaseUnit: (years: number) =>
      Moment.duration(years, "years").asMilliseconds()
  }
};

export type Duration = Omit<
  { [K in keyof typeof relationships]: number },
  "humanized"
> & {
  readonly humanized: string;
};

export type DurationInput = Partial<StringsToNumbers<Relationships>>;

export const convertInput = (source: DurationInput) =>
  pipe(
    squashToBaseUnit(relationships, source),
    val => ({
      ...explodeTypeFromBaseUnit(relationships, val),
      humanized: Moment.duration(val).humanize()
    })
  );

export type Relationships = typeof relationships;

export const GraphQL: SimpleUnit = pipe(
  relationships,
  makeNumberTableAsFunctions,
  refinedTable => ({
    inputType: new GraphQLInputObjectType({
      name: `DurationInput`,
      fields: pipe(
        refinedTable,
        Record.map(() => ({ type: GraphQLFloat }))
      )
    }),
    outputType: new GraphQLObjectType({
      name: `DurationOutput`,
      fields: {
        ...makeFieldsFromSimpleTable(refinedTable),
        humanized: {
          type: new GraphQLNonNull(GraphQLString),
          resolve: (source: Partial<StringsToNumbers>) =>
            pipe(
              squashToBaseUnit(refinedTable, source),
              baseUnit => convertInput({ milliseconds: baseUnit }).humanized
            )
        }
      }
    }) as GraphQLObjectType
  }),
  obj => ({
    inputType: createGraphQLInputObjectTypeExports(obj.inputType),
    outputType: createGraphQLObjectTypeExports(obj.outputType)
  })
);
