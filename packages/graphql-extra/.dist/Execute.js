"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var prelude_1 = require("@platform/prelude");
var GraphQL = __importStar(require("."));
exports.fromExecutableSchema = function (executableSchema) { return function (operation) { return exports.execute(executableSchema, operation); }; };
exports.execute = function (_a, _b) {
    var schema = _a.schema, context = _a.context;
    var document = _b.document, variables = _b.variables;
    return prelude_1.Result.taskTryCatch(function () {
        return GraphQL.graphql(schema, GraphQL.print(document), undefined, context, variables);
    }).chain(function (_a) {
        var data = _a.data, errors = _a.errors;
        return prelude_1.These.fromNullables(errors, data).fold(prelude_1.Result.taskFail("`data` or `errors` are required in GraphQL responses"), prelude_1.Result.taskOK);
    });
};
exports.runUnsafe = function (operation) {
    return exports.runMapUnsafe(operation, prelude_1.Fn.identity);
};
exports.runMapUnsafe = function (operation, map) {
    return prelude_1.Result.taskRunUnsafe(operation.map(function (result) { return result.fold(prelude_1.Exception.crash, map, prelude_1.Exception.crash); }));
};
//# sourceMappingURL=Execute.js.map