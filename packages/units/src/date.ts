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
  createGraphQLInputObjectTypeExports,
  createGraphQLObjectTypeExports
} from "./utils/helpers";
import { StringsToNumbers } from "./utils/types";

const relationships = {
  milliseconds: {
    fromBaseUnit: (millis: number) => millis,
    toBaseUnit: (millis: number) => millis
  },
  unix: {
    fromBaseUnit: (millis: number) =>
      Duration.convertInput({ milliseconds: millis }),
    toBaseUnit: (unix: Partial<StringsToNumbers>) =>
      Duration.convertInput(unix).milliseconds
  },
  iso: {
    fromBaseUnit: (millis: number) => Moment(millis).toISOString(),
    toBaseUnit: (iso: string) => Moment(iso).valueOf()
  },
  humanized: {
    fromBaseUnit: (millis: number) => Moment(millis).fromNow()
  },
  formatted: {
    fromBaseUnit: (millis: number) => (args: FormattedArgs) =>
      Moment(millis)
        .tz(args.zone || "UTC")
        .format(args.template)
  }
};

interface FormattedArgs {
  readonly template: string;
  readonly zone?: string;
}

export interface Date {
  readonly unix: Duration.Duration;
  readonly iso: string;
  readonly humanized: string;
  // tslint:disable-next-line:no-mixed-interface
  readonly formatted: (options: FormattedArgs) => string;
}

export type DateInput = Partial<{
  readonly unix: Partial<StringsToNumbers<Duration.Relationships>>;
  readonly iso: string;
}>;

const maybeSumUnix = (unix?: Partial<StringsToNumbers>): number =>
  unix ? relationships.unix.toBaseUnit(unix) : 0;

const maybeSumISO = (iso?: string): number =>
  iso ? relationships.iso.toBaseUnit(iso) : 0;

const squashDateToBaseUnit = (source: DateInput): number =>
  maybeSumUnix(source.unix) + maybeSumISO(source.iso);

const explodeDateFromBaseUnit = (val: number): Date => ({
  unix: relationships.unix.fromBaseUnit(val),
  iso: relationships.iso.fromBaseUnit(val),
  humanized: relationships.humanized.fromBaseUnit(val),
  formatted: relationships.formatted.fromBaseUnit(val)
});

export const GraphQL = pipe(
  {
    inputType: new GraphQLInputObjectType({
      name: `DateInput`,
      fields: {
        unix: { type: Duration.GraphQL.inputType.rawType },
        iso: { type: GraphQLString }
      }
    }),
    convertInput: (source: DateInput): Date =>
      pipe(
        squashDateToBaseUnit(source),
        val => explodeDateFromBaseUnit(val)
      ),
    outputType: new GraphQLObjectType({
      name: `DateOutput`,
      fields: {
        unix: {
          type: new GraphQLNonNull(Duration.GraphQL.outputType.rawType),
          resolve: (source: DateInput) =>
            pipe(
              squashDateToBaseUnit(source),
              milliseconds => ({ milliseconds })
            )
        },
        iso: {
          type: new GraphQLNonNull(GraphQLString),
          resolve: (source: DateInput) =>
            pipe(
              squashDateToBaseUnit(source),
              relationships.iso.fromBaseUnit
            )
        },
        humanized: {
          type: new GraphQLNonNull(GraphQLString),
          resolve: (source: DateInput) =>
            pipe(
              squashDateToBaseUnit(source),
              relationships.humanized.fromBaseUnit
            )
        },
        formatted: {
          type: new GraphQLNonNull(GraphQLString),
          args: {
            template: { type: new GraphQLNonNull(GraphQLString) },
            zone: { type: GraphQLString }
          },
          resolve: (source: DateInput, args: FormattedArgs) =>
            pipe(
              squashDateToBaseUnit(source),
              millis => relationships.formatted.fromBaseUnit(millis)(args)
            )
        }
      }
    }) as GraphQLObjectType
  },
  obj => ({
    inputType: createGraphQLInputObjectTypeExports(obj.inputType),
    outputType: createGraphQLObjectTypeExports(obj.outputType)
  })
);

export const convertInput = (source: DateInput): Date =>
  pipe(
    squashDateToBaseUnit(source),
    val => explodeDateFromBaseUnit(val)
  );
