import faker from "faker";

export function loadHumanById(id: number) {
  return id === 123 ? generateMe() : null;
}

export function projectLoader(seed: number | string = 0) {
  faker.seed(typeof seed === "string" ? parseInt(seed) : seed);

  return Promise.resolve(
    Array.from(Array(faker.random.number(3))).map(() => ({
      id: faker.random.alphaNumeric(5)
    }))
  );
}

export interface HumanFromDB {
  id: string;
  name: {
    first: {
      full: string;
      initial: string;
    };
  };
  relatives: HumanFromDB[];
  friends: HumanFromDB[];
}

export function generateMe(): HumanFromDB {
  return {
    ...generateRandomHuman(),
    relatives: [
      {
        ...generateRandomHuman(1),
        relatives: [generateRandomHuman(), generateRandomHuman(22)],
        friends: [generateRandomHuman()]
      },
      generateRandomHuman(2),
      generateRandomHuman(3),
      generateRandomHuman(11),
      generateRandomHuman(21),
      generateRandomHuman(31),
      generateRandomHuman(11),
      generateRandomHuman(21),
      generateRandomHuman(31)
    ],
    friends: [
      {
        ...generateRandomHuman(3),
        relatives: [generateRandomHuman(443), generateRandomHuman(223)],
        friends: [generateRandomHuman(44)]
      },
      {
        ...generateRandomHuman(4),
        relatives: [generateRandomHuman(153), generateRandomHuman(223)],
        friends: [generateRandomHuman(234)]
      },
      generateRandomHuman(62),
      generateRandomHuman(72),
      generateRandomHuman(82),
      generateRandomHuman(92),
      generateRandomHuman(43),
      generateRandomHuman(53),
      generateRandomHuman(63),
      generateRandomHuman(73),
      generateRandomHuman(83),
      generateRandomHuman(93),
      generateRandomHuman(44),
      generateRandomHuman(54),
      generateRandomHuman(64),
      generateRandomHuman(74),
      generateRandomHuman(84),
      generateRandomHuman(94)
    ]
  };
}

export function generateRandomHuman(seed: number = 0) {
  faker.seed(seed);
  const firstName = faker.name.firstName();
  return {
    id: faker.random.alphaNumeric(10),
    name: {
      first: {
        full: firstName,
        initial: firstName.slice(0, 1)
      }
    },
    relatives: [],
    friends: []
  };
}
