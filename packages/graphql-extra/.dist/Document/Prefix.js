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
var GraphQL = __importStar(require(".."));
exports.name = function (prefix, name) {
    return prefix + "__" + name;
};
/*
  Add a prefix (i.e. `SomePrefix__`) to every definition and type reference
  within the document which isn't already prefixed or a built-in GraphQL scalar
  type
*/
exports.document = function (prefix, document) {
    return GraphQL.visit(document, {
        ScalarTypeDefinition: prefixNode(prefix),
        ObjectTypeDefinition: prefixNode(prefix),
        InterfaceTypeDefinition: prefixNode(prefix),
        UnionTypeDefinition: prefixNode(prefix),
        EnumTypeDefinition: prefixNode(prefix),
        InputObjectTypeDefinition: prefixNode(prefix),
        NamedType: function (node) {
            return !isBuiltInScalar(node.name.value) && !node.name.value.includes("__")
                ? prefixNode(prefix)(node)
                : node;
        }
    });
};
var prefixNode = function (prefix) { return function (node) { return (__assign({}, node, { name: __assign({}, node.name, { value: exports.name(prefix, node.name.value) }) })); }; };
var isBuiltInScalar = function (typeName) {
    return GraphQL.specifiedScalarTypes.map(function (_a) {
        var name = _a.name;
        return name;
    }).includes(typeName);
};
//# sourceMappingURL=Prefix.js.map