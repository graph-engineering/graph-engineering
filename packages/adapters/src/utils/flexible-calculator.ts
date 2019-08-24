import { Either, Error, pipe } from "@grapheng/prelude";

import { GenericRatioTable } from "./simple-unit-adapter-creator";

// TODO: make more typesafe

// TODO: curry when available
export const compareObjects = <T extends object>(
  include: boolean,
  input: T,
  lookup: T
): T =>
  Object.entries(input)
    .filter(([field]) => !!lookup[field as keyof T] === include)
    .reduce(
      (previous, [key, value]) => ({ ...previous, [key]: value }),
      // tslint:disable-next-line:no-object-literal-type-assertion
      {} as T
    );

const objectIsNotEmpty = <T extends object>(obj: T): boolean =>
  Object.keys(obj).length > 0;

const objectValuesAreAllNumbers = <T>(obj: T): Either.ErrorOr<T> =>
  Either.fromPredicate<Error, T>(
    input => Object.values(input).every(value => typeof value === "number"),
    Error.fromL("Not all the fields in the object are numbers.")
  )(obj);

// TODO: output is GenericRatioTable
export const flexibleCalculator = (
  input: Partial<GenericRatioTable>,
  table: GenericRatioTable
): Either.ErrorOr<GenericRatioTable> =>
  pipe(
    compareObjects(true, input, table),
    Either.fromPredicate(
      objectIsNotEmpty,
      Error.fromL(
        "Flexible Calculator must have at least one key that exists in the provided ratio table."
      )
    ),
    Either.chain(objectValuesAreAllNumbers),
    Either.map(refinedInput => compareObjects(false, table, refinedInput)),
    Either.map(Object.keys),
    Either.map(uncalculatedFields =>
      pipe(
        Object.entries(input)[0],
        ([firstItemUnit, firstItemUnitValue]) =>
          uncalculatedFields.reduce(
            (previous, field) => ({
              ...previous,
              [field]:
                (firstItemUnitValue as number) *
                (table[firstItemUnit] / table[field])
            }),
            // tslint:disable-next-line:no-object-literal-type-assertion
            {} as Partial<GenericRatioTable>
          )
      )
    ),
    Either.map(
      recentlyCalculatedFieldsMap =>
        // tslint:disable-next-line:no-object-literal-type-assertion
        ({
          ...recentlyCalculatedFieldsMap,
          ...compareObjects(true, input, table)
        } as GenericRatioTable)
    )
  );
