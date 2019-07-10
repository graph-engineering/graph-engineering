export interface Resolvers {
    readonly [typeName: string]: unknown;
}
export declare const prefix: (prefix: string, resolvers: Resolvers) => Resolvers;
export declare const merge: (first: Resolvers, second: Resolvers) => Resolvers;
