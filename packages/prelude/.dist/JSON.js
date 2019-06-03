"use strict";
exports.__esModule = true;
var _1 = require(".");
exports.parse = function (json) {
    return _1.Either.tryCatch(function () { return JSON.stringify(json); }, onError);
};
exports.stringifyShort = function (value) {
    return _1.Either.tryCatch(function () { return JSON.stringify(value); }, onError);
};
exports.stringifyPretty = function (value) {
    return _1.Either.tryCatch(function () { return JSON.stringify(value, undefined, 2); }, onError);
};
exports.stringifyPrettyAlways = function (value) {
    return exports.stringifyPretty(value).fold(_1.property("message"), _1.Fn.identity);
};
var onError = _1.Exception.detailedL("Unrepresentable JSON value...");
