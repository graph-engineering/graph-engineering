"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
var _1 = require(".");
__export(require("io-ts"));
exports.maybe = function (type) { return _1.Runtime.union([type, _1.Runtime["null"], _1.Runtime.undefined]); };
exports.decode = function (type, value) {
    return type
        .decode(value)
        .mapLeft(function (errors) {
        return Error(_1.ReadonlyArray.catOptions(errors.map(exports.messageFromError)).join("\n"));
    });
};
exports.messageFromError = function (error) {
    return _1.ReadonlyArray.last(error.context).map(function (context) {
        return _1.Fn.applyFlipped(error.context
            .map(function (context) { return context.key; })
            .filter(function (key) { return key.length > 0; })
            .join("."))(function (path) {
            return "Expecting " + context.type.name + " " + (path === "" ? "" : " at " + path) + " but instead got `" + (error.value === undefined
                ? "undefined"
                : _1.JSON.stringifyPrettyAlways(error.value)) + "`";
        });
    });
};
