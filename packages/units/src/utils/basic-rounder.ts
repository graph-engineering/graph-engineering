import { Fn, Option, pipe } from "@grapheng/prelude";
import { GraphQLEnumType, GraphQLInputObjectType, GraphQLInt } from "graphql";

export const RoundingDirectionEnum = new GraphQLEnumType({
  name: "RoundingDirection",
  values: {
    UP: { value: 0 },
    DOWN: { value: 1 },
    NEAREST: { value: 2 }
  }
});

export const RoundingInputType = new GraphQLInputObjectType({
  name: "RoundInput",
  fields: () => ({
    toPrecision: { type: GraphQLInt },
    direction: { type: RoundingDirectionEnum }
  })
});

export interface RoundingArgs {
  readonly toPrecision?: number;
  readonly direction?: "UP" | "DOWN" | "NEAREST" | 0 | 1 | 2;
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

export const round = (num: number, round: RoundingArgs): number =>
  pipe(
    Option.fromNullable(
      round && (typeof round.toPrecision === "number" || round.direction)
    ),
    Option.map(() => {
      const finalMaxPlaces = round.toPrecision || 0;
      const adjustmentNumber = Math.pow(10, finalMaxPlaces);

      switch (round.direction) {
        case "UP":
        case 0:
          return Math.ceil(num * adjustmentNumber) / adjustmentNumber;
        case "DOWN":
        case 1:
          return Math.floor(num * adjustmentNumber) / adjustmentNumber;
        case "NEAREST":
        case 2:
          return Math.round(num * adjustmentNumber) / adjustmentNumber;
        default:
          return toTrunc(num, finalMaxPlaces);
      }
    }),
    Option.fold(() => num, Fn.identity)
  );
