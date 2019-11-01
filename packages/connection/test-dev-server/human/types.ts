export interface HumanFromDB {
  readonly id: string;
  readonly name: {
    readonly first: string;
    readonly last: string;
  };
  readonly relation: "SIBLING" | "PARENT" | "COUSIN";
  readonly friendSince: Date;
  readonly relatives: readonly number[];
  readonly friends: readonly number[];
  readonly projects: readonly SourceProject[];
}

export type Relation = "SIBLING" | "PARENT" | "COUSIN";

export interface SourceProject {
  readonly description: string;
  readonly startDate: Date;
}
