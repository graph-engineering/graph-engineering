/// <reference types="jest" />
import { GraphQLObjectType, GraphQLFieldResolver } from 'graphql';
export declare const extractResolvers: (object: GraphQLObjectType<any, any, {
    [key: string]: any;
}>) => {
    [fieldName: string]: GraphQLFieldResolver<any, any, {
        [argName: string]: any;
    }>;
};
export declare function expectSimpleObjectType(graphQLObjectType: GraphQLObjectType, value: any, queryString: string): jest.Matchers<Promise<any>>;
