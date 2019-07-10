"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Document = __importStar(require("./Document"));
exports.Document = Document;
var Execute = __importStar(require("./Execute"));
exports.Execute = Execute;
var Schema = __importStar(require("./Schema"));
exports.Schema = Schema;
__export(require("graphql"));
var graphql_tag_1 = require("graphql-tag");
exports.gql = graphql_tag_1.default;
var graphql_tools_1 = require("graphql-tools");
exports.makeExecutableSchema = graphql_tools_1.makeExecutableSchema;
//# sourceMappingURL=index.js.map