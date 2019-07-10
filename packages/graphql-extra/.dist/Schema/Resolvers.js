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
var Document = __importStar(require("../Document"));
/*
  For every resolver in a resolver map, add the module name, i.e.
  `{ Query: { ... } }` becomes `{ SomePrefix__Query: { ... } }`
*/
exports.prefix = function (prefix, resolvers) {
    return Object.entries(resolvers).reduce(function (previous, _a) {
        var _b;
        var typeName = _a[0], fields = _a[1];
        return (__assign({}, previous, (_b = {}, _b[Document.prefixName(prefix, typeName)] = fields, _b)));
    }, {});
};
exports.merge = function (first, second) {
    return Object.entries(first).concat(Object.entries(second)).reduce(function (previous, _a) {
        var _b;
        var typeName = _a[0], resolvers = _a[1];
        return (__assign({}, previous, (_b = {}, _b[typeName] = prelude_1.Option.fromNullable(previous[typeName]).fold(resolvers, function (previousResolvers) { return (__assign({}, previousResolvers, resolvers)); }), _b)));
    }, {});
};
//# sourceMappingURL=Resolvers.js.map