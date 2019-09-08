import { Either, Error, pipe } from "@grapheng/prelude";

import { makeTableAsFunctions } from "./helpers";
import {
  AllRelationships,
  RatioTableWithNumbersOrRelationshipFunctions
} from "./types";

// TODO: make more typesafe
// TODO: curry when available
export const compareObjects = <T extends object, K extends object>(
  include: boolean,
  input: T,
  lookup: K
): T =>
  Object.entries(input)
    .filter(([field]) => !!lookup[field as keyof K] === include)
    .reduce(
      (previous, [key, value]) => ({ ...previous, [key]: value }),
      // tslint:disable-next-line:no-object-literal-type-assertion
      {} as T
    );

const objectValuesAreAllNumbers = <T>(obj: T): Either.ErrorOr<T> =>
  Either.fromPredicate<Error, T>(
    input => Object.values(input).every(value => typeof value === "number"),
    Error.fromL("Not all the fields in the object are numbers.")
  )(obj);

const objectIsNotEmpty = <T>(obj: T): Either.ErrorOr<T> =>
  Either.fromPredicate<Error, T>(
    input => Object.keys(input).length > 0,
    Error.fromL(
      "Flexible Calculator must have at least one key that exists in the provided ratio table."
    )
  )(obj);

// TODO: output is GenericRatioTable
export const flexibleCalculator = <
  T extends RatioTableWithNumbersOrRelationshipFunctions
>(
  input: Partial<AllRelationships<T>>,
  _table: RatioTableWithNumbersOrRelationshipFunctions
): Either.ErrorOr<AllRelationships<T>> =>
  pipe(
    makeTableAsFunctions(_table),
    table =>
      pipe(
        Either.right(compareObjects(true, input, table)),
        Either.chain(objectIsNotEmpty),
        Either.chain(objectValuesAreAllNumbers),
        Either.map(refinedInput => compareObjects(false, table, refinedInput)),
        Either.map(Object.keys),
        Either.map(uncalculatedInputFields =>
          pipe(
            Object.entries(input)[0],
            ([firstItemUnit, firstItemUnitValue]) =>
              uncalculatedInputFields.reduce(
                (previous, inputField) => ({
                  ...previous,
                  [inputField]: pipe(
                    firstItemUnitValue as number,
                    table[firstItemUnit].toBaseUnit,
                    table[inputField].fromBaseUnit
                  )
                }),
                // tslint:disable-next-line:no-object-literal-type-assertion
                {} as Partial<AllRelationships<T>>
              )
          )
        ),
        Either.map(
          recentlyCalculatedFieldsMap =>
            // tslint:disable-next-line:no-object-literal-type-assertion
            ({
              ...recentlyCalculatedFieldsMap,
              ...compareObjects(true, input, table)
            } as AllRelationships<T>)
        )
      )
  );
