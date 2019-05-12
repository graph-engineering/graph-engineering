"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
exports.extractResolvers = function (object) {
    return Object.entries(object.getFields()).reduce(function (previous, _a) {
        var _b;
        var name = _a[0], field = _a[1];
        return (__assign({}, previous, (_b = {}, _b[name] = field.resolve, _b)));
    }, {});
};
// export function expectSimpleObjectType(
// 	graphQLObjectType: GraphQLObjectType,
// 	value: any,
// 	queryString: string
// ): jest.Matchers<Promise<any>> {
// 	const schema = new GraphQLSchema({
// 		query: new GraphQLObjectType({
// 			name: 'Query',
// 			fields: {
// 				arbitraryRootField: {
// 					type: graphQLObjectType,
// 					resolve: () => value
// 				}
// 			}
// 		})
// 	})
// 	return expect(
// 		graphql(
// 			schema,
// 			`
// 					{
// 						arbitraryRootField ${queryString}
// 					}
// 				`
// 		).then(response => {
// 			if (response.errors) throw new Error(response.errors[0].message)
// 			return response.data && response.data.arbitraryRootField
// 		})
// 	)
// }
function expectSimpleObjectType(graphQLObjectType, value, queryString) {
    var schema = new graphql_1.GraphQLSchema({
        query: new graphql_1.GraphQLObjectType({
            name: 'Query',
            fields: {
                arbitraryRootField: {
                    type: graphQLObjectType,
                    resolve: function () { return value; }
                }
            }
        })
    });
    return expect(graphql_1.graphql(schema, "\n\t\t\t\t\t{\n\t\t\t\t\t\tarbitraryRootField " + queryString + "\n\t\t\t\t\t}\n\t\t\t\t").then(function (response) {
        if (response.errors)
            throw new Error(response.errors[0].message);
        return response.data && response.data.arbitraryRootField;
    }));
}
exports.expectSimpleObjectType = expectSimpleObjectType;
//# sourceMappingURL=utils.js.map