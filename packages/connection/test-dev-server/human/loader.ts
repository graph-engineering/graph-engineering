import { generateRandomHuman, populationSize } from "./helpers";
import { HumanFromDB } from "./types";

const humans = Array(populationSize)
  .fill(1)
  .map((_, i) => i + 1)
  .map(generateRandomHuman)
  // tslint:disable-next-line:no-object-literal-type-assertion
  .reduce((previous, human) => ({ ...previous, [human.id]: human }), {} as {
    readonly [key: string]: HumanFromDB;
  });

export const getByID = (id: string): HumanFromDB | null => humans[id] || null;
