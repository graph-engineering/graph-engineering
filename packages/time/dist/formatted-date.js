"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var moment_timezone_1 = __importDefault(require("moment-timezone"));
var formatted_duration_1 = require("./formatted-duration");
var utils_1 = require("./utils");
// TODO: I'm not immediately sure why this can't be used below.
// interface FormattedFieldArgs {
// 	template: string
// 	timezone: string
// }
exports.FormattedDate = new graphql_1.GraphQLObjectType({
    name: 'FormattedDate',
    fields: function () { return ({
        unix: {
            type: new graphql_1.GraphQLNonNull(formatted_duration_1.FormattedDuration),
            resolve: function (date) { return moment_timezone_1.default.duration(date.valueOf(), 'ms'); }
        },
        iso: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
            resolve: function (date) { return date.toISOString(); }
        },
        humanized: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
            resolve: function (date) { return moment_timezone_1.default(date).fromNow(); }
        },
        formatted: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
            args: {
                template: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                timezone: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
            },
            resolve: function (date, args) {
                return moment_timezone_1.default(date)
                    .tz(args.timezone)
                    .format(args.template);
            }
        }
    }); }
});
exports.resolvers = utils_1.extractResolvers(exports.FormattedDate);
exports.typeDefs = graphql_1.printType(exports.FormattedDate);
//# sourceMappingURL=formatted-date.js.map