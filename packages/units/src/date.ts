import { pipe } from "@grapheng/prelude";
import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from "graphql";
import Moment from "moment-timezone";

import * as Duration from "./duration";
import {
  createInputOutputTypeExports,
  makeNumberTableAsFunctions,
  squashToBaseUnit
} from "./utils/helpers";
import { SimpleUnit } from "./utils/simple-unit-creator";
import { StringsToNumbers } from "./utils/types";

export const relationships = {
  milliseconds: {
    fromBaseUnit: (millis: number) => millis,
    toBaseUnit: (millis: number) => millis
  },
  unix: {
    fromBaseUnit: (millis: number) => ({
      milliseconds: millis
    }),
    toBaseUnit: (unix: Partial<StringsToNumbers>) =>
      squashToBaseUnit(makeNumberTableAsFunctions(Duration.relationships), unix)
  },
  iso: {
    fromBaseUnit: (millis: number) => Moment(millis).toISOString(),
    toBaseUnit: (iso: string) => Moment(iso).valueOf()
  },
  humanized: {
    fromBaseUnit: (millis: number) => Moment(millis).fromNow()
  }
};

type Source = Partial<{
  readonly unix: Partial<StringsToNumbers>;
  readonly iso: string;
}>;

const maybeSumUnix = (unix?: Partial<StringsToNumbers>): number =>
  unix ? relationships.unix.toBaseUnit(unix) : 0;

const maybeSumISO = (iso?: string): number =>
  iso ? relationships.iso.toBaseUnit(iso) : 0;

const squashDateToBaseUnit = (source: Source): number =>
  maybeSumUnix(source.unix) + maybeSumISO(source.iso);

const Date: SimpleUnit = pipe(
  {
    inputType: new GraphQLInputObjectType({
      name: `DateInput`,
      fields: {
        unix: { type: Duration.default.inputType.rawType },
        iso: { type: GraphQLString }
      }
    }),
    outputType: new GraphQLObjectType({
      name: `DateOutput`,
      fields: {
        unix: {
          type: new GraphQLNonNull(Duration.default.outputType.rawType),
          resolve: (source: Source) =>
            pipe(
              squashDateToBaseUnit(source),
              relationships.unix.fromBaseUnit
            )
        },
        iso: {
          type: new GraphQLNonNull(GraphQLString),
          resolve: (source: Source) =>
            pipe(
              squashDateToBaseUnit(source),
              relationships.iso.fromBaseUnit
            )
        },
        humanized: {
          type: new GraphQLNonNull(GraphQLString),
          resolve: (source: Source) =>
            pipe(
              squashDateToBaseUnit(source),
              millis => Moment(millis).fromNow()
            )
        },
        formatted: {
          type: new GraphQLNonNull(GraphQLString),
          args: {
            template: { type: new GraphQLNonNull(GraphQLString) },
            zone: { type: GraphQLString }
          },
          resolve: (source: Source, args: any) =>
            pipe(
              squashDateToBaseUnit(source),
              millis =>
                Moment(millis)
                  .tz(args.zone || "UTC")
                  .format(args.template)
            )
        }
      }
    }) as GraphQLObjectType
  },
  createInputOutputTypeExports
);

export default Date;
