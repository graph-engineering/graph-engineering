"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tools_1 = require("graphql-tools");
var prelude_1 = require("@platform/prelude");
var Config = __importStar(require("./Config"));
exports.executable = function (options) {
    return fromSchema(options.context.dynamic, Config.toSchema(options.context.static, options.schema));
};
var fromSchema = function (dynamicContext, _a) {
    var document = _a.document, resolvers = _a.resolvers;
    return prelude_1.These.fromOptions(document, resolvers).fold(fail(["document", "resolvers"]), function (these) {
        return these.fold(prelude_1.Fn.constant(fail(["resolvers"])), prelude_1.Fn.constant(fail(["document"])), function (document, resolvers) {
            return prelude_1.Either.right({
                context: dynamicContext,
                schema: graphql_tools_1.makeExecutableSchema({
                    typeDefs: document,
                    resolvers: resolvers
                })
            });
        });
    });
};
var fail = function (missingFields) {
    return prelude_1.Result.fail(missingFields
        .map(function (field) { return "`" + field + "`"; })
        .join(" and ")
        .concat(" must be provided for an executable schema!"));
};
//# sourceMappingURL=Executable.js.map