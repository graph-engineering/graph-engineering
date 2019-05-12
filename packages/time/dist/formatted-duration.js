"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var utils_1 = require("./utils");
exports.FormattedDuration = new graphql_1.GraphQLObjectType({
    name: 'FormattedDuration',
    fields: function () { return ({
        humanized: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
            resolve: function (duration) { return duration.humanize(); }
        },
        milliseconds: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt),
            resolve: function (duration) { return duration.asMilliseconds(); }
        },
        seconds: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat),
            resolve: function (duration) { return duration.asSeconds(); }
        },
        minutes: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat),
            resolve: function (duration) { return duration.asMinutes(); }
        },
        hours: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat),
            resolve: function (duration) { return duration.asHours(); }
        },
        days: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat),
            resolve: function (duration) { return duration.asDays(); }
        },
        weeks: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat),
            resolve: function (duration) { return duration.asWeeks(); }
        },
        months: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat),
            resolve: function (duration) { return duration.asMonths(); }
        },
        years: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat),
            resolve: function (duration) { return duration.asYears(); }
        }
    }); }
});
exports.resolvers = utils_1.extractResolvers(exports.FormattedDuration);
exports.typeDefs = graphql_1.printType(exports.FormattedDuration);
//# sourceMappingURL=formatted-duration.js.map