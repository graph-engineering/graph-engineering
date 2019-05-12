import * as FormattedDate from './formatted-date';
import * as FormattedDuration from './formatted-duration';
export declare const typeDefs: any;
export declare const resolvers: {
    FormattedDate: {
        [fieldName: string]: import("graphql").GraphQLFieldResolver<any, any, {
            [argName: string]: any;
        }>;
    };
    FormattedDuration: {
        [fieldName: string]: import("graphql").GraphQLFieldResolver<any, any, {
            [argName: string]: any;
        }>;
    };
};
export { FormattedDate, FormattedDuration };
