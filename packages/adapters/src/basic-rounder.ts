import { Fn, Option, pipe } from "@grapheng/prelude";
import { GraphQLEnumType, GraphQLInt } from "graphql";

export const RoundingDirectionEnum = new GraphQLEnumType({
  name: "RoundingDirection",
  values: {
    UP: { value: 0 },
    DOWN: { value: 1 },
    NEAREST: { value: 2 }
  }
});

export const args = {
  maxDecimalPlaces: { type: GraphQLInt },
  roundingDirection: { type: RoundingDirectionEnum }
};

export interface Args {
  readonly maxDecimalPlaces?: number;
  readonly roundingDirection?: "UP" | "DOWN" | "NEAREST";
}

const toTrunc = (input: number, maxDecimalPlaces: number): number => {
  const [stringBefore, stringAfter] = `${input}.`.split(".");
  // tslint:disable
  let final = stringBefore;
  if (maxDecimalPlaces <= 0) {
    final = stringBefore;
  } else if (stringAfter.length > maxDecimalPlaces) {
    final = `${stringBefore}.${stringAfter.substr(0, maxDecimalPlaces)}`;
  } else {
    final = `${stringBefore}.${stringAfter}`;
  }
  // tslint:enable

  return parseFloat(final);
};

export const round = (
  num: number,
  { maxDecimalPlaces, roundingDirection }: Args
): number =>
  pipe(
    Option.fromNullable(
      typeof maxDecimalPlaces === "number" || roundingDirection
    ),
    Option.map(() => {
      const finalMaxPlaces = maxDecimalPlaces || 0;
      const adjustmentNumber = Math.pow(10, finalMaxPlaces);

      switch (roundingDirection) {
        case "DOWN":
          return Math.floor(num * adjustmentNumber) / adjustmentNumber;
        case "UP":
          return Math.ceil(num * adjustmentNumber) / adjustmentNumber;
        case "NEAREST":
          return Math.round(num * adjustmentNumber) / adjustmentNumber;
        default:
          return toTrunc(num, finalMaxPlaces);
      }
    }),
    Option.fold(() => num, Fn.identity)
  );
