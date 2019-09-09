import { pipe, Record } from "@grapheng/prelude";
import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType
} from "graphql";

import * as BasicRounder from "./basic-rounder";
import {
  createGraphQLInputObjectTypeExports,
  createGraphQLObjectTypeExports,
  makeTableAsFunctions
} from "./helpers";
import {
  RatioTableWithNumbersOrRelationshipFunctions,
  StringsToNumbers
} from "./types";

export interface SimpleUnitAdapterConfig<T> {
  readonly strict?: boolean;
  readonly name?: string;
  readonly selectedFields?: ReadonlyArray<keyof T>;
  readonly customFields?: { readonly [key: string]: number };
}

export interface SimpleUnitAdapter {
  readonly inputType: {
    readonly typeDefs: any;
    readonly rawType: GraphQLInputObjectType;
  };
  readonly outputType: {
    readonly typeDefs: any;
    readonly rawType: GraphQLObjectType;
    readonly resolvers: object;
  };
}

export const makeSimpleUnitTypes = <
  T extends RatioTableWithNumbersOrRelationshipFunctions
>(
  baseRatioTable: T,
  typeName: string
): SimpleUnitAdapter =>
  pipe(
    baseRatioTable,
    makeTableAsFunctions,
    ratioTable => ({
      inputType: new GraphQLInputObjectType({
        name: `${typeName}Input`,
        fields: () =>
          pipe(
            ratioTable,
            Record.map(() => ({ type: GraphQLFloat }))
          )
      }),
      outputType: new GraphQLObjectType({
        name: `${typeName}Output`,
        fields: () =>
          Object.entries(ratioTable).reduce(
            (previous, [unit, unitFunctions]) => ({
              ...previous,
              [unit]: {
                type: new GraphQLNonNull(GraphQLFloat),
                args: { round: { type: BasicRounder.RoundingInputType } },
                resolve: (
                  source: Partial<StringsToNumbers>,
                  args: { readonly round: BasicRounder.RoundingArgs }
                ) =>
                  pipe(
                    source,
                    Record.reduceWithIndex(
                      0,
                      (unit, previous, value) =>
                        previous + ratioTable[unit].toBaseUnit(value as number)
                    ),
                    unitFunctions.fromBaseUnit,
                    num => BasicRounder.round(num, args.round)
                  )
              }
            }),
            {}
          )
      })
    }),
    ({ inputType, outputType }) => ({
      inputType: createGraphQLInputObjectTypeExports(inputType),
      outputType: createGraphQLObjectTypeExports(outputType)
    })
  );
