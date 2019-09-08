import { Either, Error, Fn, Option, pipe, Record } from "@grapheng/prelude";
import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType
} from "graphql";

import * as BasicRounder from "./basic-rounder";
import { flexibleCalculator } from "./flexible-calculator";
import {
  createGraphQLInputObjectTypeExports,
  createGraphQLObjectTypeExports,
  makeTableAsFunctions
} from "./helpers";
import {
  RatioTableWithNumbersOrRelationshipFunctions,
  StringsToNumbers
} from "./types";

// const createTypeFromTable = (table: )

const keepFieldsOnObj = <T extends object>(
  fieldsToKeep: ReadonlyArray<keyof T>,
  obj: T
): Partial<T> =>
  fieldsToKeep.reduce(
    (previous, current) => ({
      ...previous,
      [current]: obj[current]
    }),
    // tslint:disable-next-line:no-object-literal-type-assertion
    {} as T
  );

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

export const makeSimpleUnitAdapterGenerator = <
  T extends RatioTableWithNumbersOrRelationshipFunctions
>(
  baseRatioTable: T,
  defaultTypeName: string
) => (
  config: SimpleUnitAdapterConfig<T> = { strict: true }
): SimpleUnitAdapter =>
  pipe(
    Option.fromNullable(config.selectedFields),
    // TODO: handle runtime strings that don't exist in here
    Option.map(selectedFields =>
      keepFieldsOnObj(selectedFields, baseRatioTable)
    ),
    Option.fold(() => baseRatioTable, Fn.identity),
    ratioTable => ({
      ...ratioTable,
      ...(config.customFields || {})
    }),
    makeTableAsFunctions,
    ratioTable => ({
      inputType: new GraphQLInputObjectType({
        name: `${config.name || defaultTypeName}Input`,
        fields: () =>
          pipe(
            ratioTable,
            Record.map(() => ({ type: GraphQLFloat }))
          )
      }),
      outputType: new GraphQLObjectType({
        name: config.name || defaultTypeName,
        fields: () =>
          Object.entries(ratioTable).reduce(
            (previous, [unit, unitFunctions]) => ({
              ...previous,
              [unit]: {
                type: new GraphQLNonNull(GraphQLFloat),
                args: BasicRounder.args,
                resolve: (
                  source: number | Partial<StringsToNumbers>,
                  args: BasicRounder.Args
                ) =>
                  pipe(
                    typeof source === "number"
                      ? Either.right(unitFunctions.fromBaseUnit(source))
                      : pipe(
                          typeof config.strict === "undefined"
                            ? true
                            : config.strict,
                          Either.fromPredicate(
                            strict => !strict,
                            Error.fromL(
                              `In Strict mode, the source of ${config.name ||
                                "DistanceAdapter"} must be a number. Instead, you gave a(n) ${typeof source}`
                            )
                          ),
                          Either.chain(() =>
                            flexibleCalculator(source, ratioTable)
                          ),
                          Either.map(table => table[unit])
                        ),
                    Either.map(num => BasicRounder.round(num, args)),
                    Either.fold(Error.throw, Fn.identity)
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
