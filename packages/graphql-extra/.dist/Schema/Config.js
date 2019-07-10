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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var prelude_1 = require("@platform/prelude");
var Schema = __importStar(require("."));
var Document = __importStar(require("../Document"));
var Resolvers = __importStar(require("./Resolvers"));
var Root = __importStar(require("./Root"));
exports.toSchema = function (staticContext, userDefinition) {
    return prelude_1.Fn.applyFlipped(fromUserDefinition(staticContext, userDefinition))(function (_a) {
        var root = _a.root, prefix = _a.prefix, schemas = _a.schemas, document = _a.document, resolvers = _a.resolvers;
        return prelude_1.Fn.applyFlipped({
            document: prelude_1.Option.fromNullable(document),
            resolvers: prelude_1.Option.fromNullable(resolvers)
        })(prelude_1.Fn.pipe(function (schema) {
            return prelude_1.Option.fromNullable(schemas).fold(schema, function (schemas) {
                return schemas
                    .map(prelude_1.Fn.applyFlipped(staticContext))
                    .reduce(Schema.merge, schema);
            });
        }, function (schema) {
            return prelude_1.Option.fromNullable(prefix).fold(schema, function (prefix) { return ({
                document: schema.document.map(prelude_1.Fn.curry(Document.prefix)(prefix)),
                resolvers: schema.resolvers.map(prelude_1.Fn.curry(Resolvers.prefix)(prefix))
            }); });
        }, function (schema) {
            return prelude_1.Option.fromNullable(root).fold(schema, function (root) {
                return Root.addToSchema(root, schema);
            });
        }, function (schema) { return (__assign({}, schema, { document: schema.document.map(Document.render) })); }));
    });
};
var fromUserDefinition = function (staticContext, userDefinition) {
    return typeof userDefinition === "function"
        ? userDefinition(staticContext)
        : !("definitions" in userDefinition)
            ? userDefinition
            : { document: userDefinition };
};
//# sourceMappingURL=Config.js.map