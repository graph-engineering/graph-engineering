import { pipe, Record } from "@grapheng/prelude";
import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLObjectType
} from "graphql";

import {
  createSimpleUnitTypeExports,
  explodeTypeFromBaseUnit,
  makeFieldsFromSimpleTable,
  makeNumberTableAsFunctions,
  squashToBaseUnit
} from "./helpers";
import {
  InputTypeConverter,
  RatioTableWithNumbersOrRelationshipFunctions,
  StringsToNumbers
} from "./types";

export interface SimpleUnit<T> {
  readonly inputType: {
    readonly typeDefs: any;
    readonly rawType: GraphQLInputObjectType;
  };
  readonly outputType: {
    readonly typeDefs: any;
    readonly rawType: GraphQLObjectType;
    readonly resolvers: object;
  };
  readonly convertInput: InputTypeConverter<T>;
}

export const makeSimpleUnitTypes = <
  T extends RatioTableWithNumbersOrRelationshipFunctions<T>
>(
  baseRatioTable: T,
  typeName: string
): SimpleUnit<T> =>
  pipe(
    baseRatioTable,
    makeNumberTableAsFunctions,
    ratioTable => ({
      convertInput: (
        source: Partial<StringsToNumbers<T>>
      ): StringsToNumbers<T> =>
        pipe(
          squashToBaseUnit(ratioTable, source),
          val => explodeTypeFromBaseUnit(ratioTable, val)
        ),
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
        fields: makeFieldsFromSimpleTable(ratioTable)
      }) as GraphQLObjectType
    }),
    createSimpleUnitTypeExports
  );
