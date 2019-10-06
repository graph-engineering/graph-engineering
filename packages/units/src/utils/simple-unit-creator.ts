import { pipe, Record } from "@grapheng/prelude";
import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLObjectType
} from "graphql";

import {
  createInputOutputTypeExports,
  makeFieldsFromSimpleTable,
  makeNumberTableAsFunctions
} from "./helpers";
import { RatioTableWithNumbersOrRelationshipFunctions } from "./types";

export interface SimpleUnit {
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
): SimpleUnit =>
  pipe(
    baseRatioTable,
    makeNumberTableAsFunctions,
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
        fields: makeFieldsFromSimpleTable(ratioTable)
      }) as GraphQLObjectType
    }),
    createInputOutputTypeExports
  );
