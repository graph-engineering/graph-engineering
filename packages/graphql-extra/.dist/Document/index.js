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
var GraphQL = __importStar(require("graphql"));
var prelude_1 = require("@platform/prelude");
var Interface = __importStar(require("./Interface"));
var Prefix_1 = require("./Prefix");
exports.prefixName = Prefix_1.name;
exports.prefix = Prefix_1.document;
exports.empty = {
    kind: "Document",
    definitions: []
};
exports.fromDefinitions = function (definitions) {
    return prelude_1.Option.fromNullable(definitions[0]).map(function () { return ({
        kind: "Document",
        definitions: definitions
    }); });
};
exports.render = function (document) { return (__assign({}, document, { definitions: document.definitions.map(function (definition) {
        return definition.kind === "ObjectTypeDefinition"
            ? Interface.implement(document, definition)
            : definition;
    }) })); };
exports.merge = function (first, second) {
    return prelude_1.Fn.applyFlipped(first.definitions.concat(second.definitions))(prelude_1.Fn.pipe(seperateDefinitions, function (_a) {
        var query = _a.query, mutation = _a.mutation, definitions = _a.definitions;
        return [query, mutation].reduce(function (previous, rootType) {
            return rootType.fold(previous, function (rootType) { return previous.concat([rootType]); });
        }, definitions);
    }, function (definitions) { return (__assign({}, first, { definitions: definitions })); }));
};
var seperateDefinitions = function (definitions) {
    return definitions.reduce(function (previous, definition) {
        return definition.kind !== "ObjectTypeDefinition" ||
            (definition.name.value !== "Query" &&
                definition.name.value !== "Mutation")
            ? __assign({}, previous, { definitions: previous.definitions.concat([definition]) }) : prelude_1.Fn.applyFlipped(definition.name.value.toLowerCase())(function (operationTypeName) {
            var _a;
            return (__assign({}, previous, (_a = {}, _a[operationTypeName] = prelude_1.Option.some(previous[operationTypeName].fold(definition, prelude_1.Fn.curry(exports.mergeObjectTypes)(definition))), _a)));
        });
    }, {
        definitions: [],
        query: prelude_1.Option.none,
        mutation: prelude_1.Option.none
    });
};
exports.mergeObjectTypes = function (first, second) { return (__assign({}, first, { kind: "ObjectTypeDefinition", fields: prelude_1.These.fromOptions(prelude_1.Option.fromNullable(first.fields), prelude_1.Option.fromNullable(second.fields)).fold([], function (fields) {
        return fields.fold(prelude_1.Fn.identity, prelude_1.Fn.identity, function (first, second) {
            return prelude_1.Fn.applyFlipped(first.concat(second))(prelude_1.ReadonlyArray.uniq({
                equals: function (first, second) { return first.name.value === second.name.value; }
            }));
        });
    }) })); };
exports.findObjectType = function (document, name) {
    return exports.findType(document, name).refine(function (type) {
        return type.kind === "ObjectTypeDefinition";
    });
};
exports.findInterfaceType = function (document, name) {
    return exports.findType(document, name).refine(function (type) {
        return type.kind === "InterfaceTypeDefinition";
    });
};
exports.findType = function (document, name) {
    return prelude_1.Option.fromNullable(document.definitions.find(function (definition) {
        return GraphQL.isTypeDefinitionNode(definition) &&
            definition.name.value === name;
    }));
};
//# sourceMappingURL=index.js.map