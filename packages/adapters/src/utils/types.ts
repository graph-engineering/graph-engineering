export interface RelationshipFunctions {
  readonly toBaseUnit: (num: number) => number;
  readonly fromBaseUnit: (num: number) => number;
}

export interface RatioTableWithOnlyNumbers {
  readonly [key: string]: number;
}

export interface RatioTableWithNumbersOrRelationshipFunctions {
  readonly [key: string]: number | RelationshipFunctions;
}

export interface RatioTableWithOnlyRelationshipFunctions {
  readonly [key: string]: RelationshipFunctions;
}
