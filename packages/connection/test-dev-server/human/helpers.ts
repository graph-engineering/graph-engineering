import faker from "faker";

import { HumanFromDB, Relation } from "./types";

export const populationSize = 1000;
const maxNumberOfFriends = 200;
const maxNumberOfFamily = 50;
const maxNumberOfProjects = 50;

const relations: readonly Relation[] = ["SIBLING", "PARENT", "COUSIN"];

//tslint:disable
export const generateRandomNumberSequence = (
  max: number,
  quantity: number,
  seed: number
) => {
  const adjustedMax = Math.max(1, max);
  faker.random.number(adjustedMax); // waste first value
  faker.seed(seed);
  const arr: readonly number[] = [];
  // remove duplicates?

  Array(quantity)
    .fill(1)
    .forEach(() => {
      arr.push(faker.random.number(adjustedMax));
    });

  return arr;
};

export const generateRandomHuman = (seed: number = 1): HumanFromDB => {
  if (seed < 1) {
    throw new Error("Seed should never be less than 1.");
  }

  faker.seed(seed);
  const id = faker.random.alphaNumeric(20);

  faker.seed(seed);
  const first = faker.name.firstName();

  faker.seed(seed);
  const last = faker.name.lastName();

  faker.seed(seed);
  const randomRelationIndex = faker.random.number(relations.length - 1);
  const relation = relations[randomRelationIndex] as Relation;

  faker.seed(seed);
  const result = new Date(faker.date.between("1990-01-01", "2019-01-01"));

  faker.seed(seed);
  const numProjects = faker.random.number(maxNumberOfProjects);

  faker.seed(seed);
  const numFriends = faker.random.number(maxNumberOfFriends);
  const friends = generateRandomNumberSequence(
    populationSize,
    numFriends,
    seed
  );

  faker.seed(seed);
  const numRelatives = faker.random.number(maxNumberOfFamily);
  const relatives = generateRandomNumberSequence(
    populationSize,
    numRelatives,
    seed
  );

  const projects = Array(numProjects)
    .fill(1)
    .map((_, i) => {
      const projectSeedNum = 1000 + i;

      faker.seed(projectSeedNum);
      const description = faker.random.words();

      faker.seed(projectSeedNum);
      const startDate = new Date(
        faker.date.between("2000-01-01", "2019-01-01")
      );

      return {
        description,
        startDate
      };
    });

  return {
    id,
    relation,
    friendSince: result,
    name: { first, last },
    relatives,
    friends,
    projects
  };
};
// tslint:enable
