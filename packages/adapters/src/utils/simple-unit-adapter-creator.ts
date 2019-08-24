import { Either, Error, Fn, Option, pipe } from "@grapheng/prelude";
import { GraphQLFloat, GraphQLNonNull, GraphQLObjectType } from "graphql";

import * as BasicRounder from "./basic-rounder";
import { flexibleCalculator } from "./flexible-calculator";
import { createGraphQLExports } from "./helpers";

export interface GenericRatioTable {
  readonly [key: string]: number;
}

export type PossibleFields = keyof GenericRatioTable;

export const makeSimpleUnitAdapter = <T extends GenericRatioTable>(
  baseRatioTable: T
) => (
  config: {
    readonly strict?: boolean;
    readonly name?: string;
    readonly selectedFields?: readonly PossibleFields[];
    readonly customFields?: { readonly [key: string]: number };
  } = { strict: true }
) =>
  pipe(
    Option.fromNullable(config.selectedFields),
    // TODO: handle runtime strings that don't exist in here
    Option.map(selectedFields =>
      selectedFields.reduce(
        (previous, current) => ({
          ...previous,
          [current]: baseRatioTable[current]
        }),
        // tslint:disable-next-line:no-object-literal-type-assertion
        {} as T // technically a partial
      )
    ),
    Option.fold(() => baseRatioTable, Fn.identity),
    ratioTable => ({
      ...ratioTable,
      ...(config.customFields || {})
    }),
    ratioTable =>
      new GraphQLObjectType({
        name: config.name || "DistanceAdapter",
        fields: () =>
          Object.entries(ratioTable).reduce(
            (previous, [unit, ratio]) => ({
              ...previous,
              [unit]: {
                type: new GraphQLNonNull(GraphQLFloat),
                args: BasicRounder.args,
                resolve: (
                  source: number | Partial<GenericRatioTable>,
                  args: BasicRounder.Args
                ) =>
                  pipe(
                    typeof source === "number"
                      ? Either.right(source / ratio)
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
      }),
    createGraphQLExports
  );
