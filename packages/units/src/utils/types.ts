export interface NumberRelationshipFunctions {
  readonly toBaseUnit: (num: number) => number;
  readonly fromBaseUnit: (num: number) => number;
}

export type AllRelationships<T> = { [K in keyof T]: number };

export interface SimpleObject {
  readonly [key: string]: any;
}

export type StringsToNumbers<T = SimpleObject> = {
  [K in keyof T]: number;
};

export type RatioTableWithNumbersOrRelationshipFunctions<T = SimpleObject> = {
  readonly [K in keyof T]: number | NumberRelationshipFunctions;
};

export type RatioTableWithOnlyRelationshipFunctions<
  T = SimpleObject,
  B = NumberRelationshipFunctions
> = {
  [K in keyof T]: B;
};

export type InputTypeConverter<T = SimpleObject> = (
  source: Partial<StringsToNumbers<T>>
) => StringsToNumbers<T>;
