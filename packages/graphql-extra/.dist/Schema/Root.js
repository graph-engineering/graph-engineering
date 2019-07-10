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
exports.addToSchema = function (userDefinition, schema) {
    return prelude_1.Fn.applyFlipped(fromUserDefinition(userDefinition))(function (root) {
        return root.document.fold(schema, function (document) {
            return document.definitions
                .filter(isRootOperationType)
                .map(function (definition) { return rootSchemaFromType(root, definition); })
                .reduce(Schema.merge, schema);
        });
    });
};
var fromUserDefinition = function (userDefinition) {
    return "definitions" in userDefinition
        ? { document: prelude_1.Option.some(userDefinition), resolvers: prelude_1.Option.none }
        : {
            document: prelude_1.Option.fromNullable(userDefinition.document),
            resolvers: prelude_1.Option.fromNullable(userDefinition.resolvers)
        };
};
var isRootOperationType = function (definition) {
    return definition.kind === "ObjectTypeDefinition" &&
        (definition.name.value === "Query" || definition.name.value === "Mutation");
};
var rootSchemaFromType = function (root, type) { return ({
    document: Document.fromDefinitions([type]),
    resolvers: root.resolvers
        .chain(function (resolvers) { return prelude_1.Option.fromNullable(resolvers[type.name.value]); })
        .fold(defaultResolversFromType(type), function (resolvers) {
        var _a;
        return prelude_1.Option.some((_a = {},
            _a[type.name.value] = resolvers,
            _a));
    })
}); };
var defaultResolversFromType = function (_a) {
    var name = _a.name.value, fields = _a.fields;
    return prelude_1.Option.fromNullable(fields).map(function (fields) {
        var _a;
        return (_a = {},
            _a[name] = fields.reduce(function (previous, field) {
                var _a;
                return (__assign({}, previous, (_a = {}, _a[field.name.value] = function (_source, args) { return args; }, _a)));
            }, {}),
            _a);
    });
};
//# sourceMappingURL=Root.js.map