import { pipe, Record } from "@grapheng/prelude";
import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLObjectType
} from "graphql";

import {
  createSimpleUnitTypeExports,
  makeFieldsFromSimpleTable
} from "./helpers";
import { RatioTableWithOnlyRelationshipFunctions } from "./types";

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
  T extends RatioTableWithOnlyRelationshipFunctions<T>
>(
  baseRatioTable: T,
  typeName: string
): SimpleUnit =>
  pipe(
    baseRatioTable,
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
    createSimpleUnitTypeExports
  );
