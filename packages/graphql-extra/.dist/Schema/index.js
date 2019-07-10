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
var prelude_1 = require("@platform/prelude");
var Document = __importStar(require("../Document"));
var Config = __importStar(require("./Config"));
var Resolvers = __importStar(require("./Resolvers"));
__export(require("./Executable"));
exports.empty = {
    document: prelude_1.Option.none,
    resolvers: prelude_1.Option.none
};
exports.section = function () { return function (userDefinition) { return function (staticContext) {
    return Config.toSchema(staticContext, userDefinition);
}; }; };
exports.merge = function (a, b) { return ({
    document: prelude_1.Option.merge(a.document, b.document, Document.merge),
    resolvers: prelude_1.Option.merge(a.resolvers, b.resolvers, Resolvers.merge)
}); };
//# sourceMappingURL=index.js.map