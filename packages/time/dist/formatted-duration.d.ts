import Moment from 'moment-timezone';
import { GraphQLObjectType } from 'graphql';
export declare const FormattedDuration: GraphQLObjectType<Moment.Duration, any, {
    [key: string]: any;
}>;
export declare const resolvers: {
    [fieldName: string]: import("graphql").GraphQLFieldResolver<any, any, {
        [argName: string]: any;
    }>;
};
export declare const typeDefs: string;
