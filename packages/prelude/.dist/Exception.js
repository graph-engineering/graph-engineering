"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
var _1 = require(".");
__export(require("fp-ts/lib/Exception"));
exports.crashL = function (exception) { return function () { return exports.crash(exception); }; };
exports.crash = function (exception) {
    throw exports.unknown(exception);
};
exports.detailed = function (message, details) {
    return Error(message + "\n\n" + _1.JSON.stringifyPrettyAlways(details));
};
exports.detailedL = function (message, knownDetails) { return function (unknownDetails) {
    return exports.detailed(message, knownDetails
        ? { details: knownDetails, exception: unknownDetails }
        : unknownDetails);
}; };
exports.merge = function (message, exceptions) {
    return exports.detailed([message, ""].concat(exceptions.map(_1.property("message"))).join("\n"), exceptions);
};
exports.mergeL = function (message) { return function (exceptions) { return exports.merge(message, exceptions); }; };
exports.unknown = function (exception) {
    return _1.Option.fromNullable(exception).fold(Error("An unknown error occurred"), function (exception) {
        return exception instanceof Error
            ? exception
            : typeof exception === "object" && "message" in exception
                ? Error(exception.message)
                : typeof exception === "string"
                    ? Error(exception)
                    : Error("An unknown error occurred...\n\n" + _1.JSON.stringifyPrettyAlways(exception));
    });
};
