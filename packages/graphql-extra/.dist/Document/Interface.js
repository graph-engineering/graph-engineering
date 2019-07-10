"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var prelude_1 = require("@platform/prelude");
var Document = __importStar(require("."));
/*
  GraphQL requires interface implementors to redeclare fields...

  interface A {
    x: Int
  }

  type B implements A {
    x: Int  <-- `x` is redeclared
    ...
  }

  The following function automatically implements fields from interfaces so they
  don't have to be retyped.
*/
exports.implement = function (document, objectType) {
    return prelude_1.Option.fromNullable(objectType.interfaces).fold(objectType, prelude_1.Fn.pipe(function (interfaceReferences) {
        return interfaceReferences.map(prelude_1.Fn.curry(fieldsFromType)(document));
    }, function (fields) { return ({ fields: prelude_1.ReadonlyArray.flatten(fields) }); }, prelude_1.Fn.curry(Document.mergeObjectTypes)(objectType)));
};
var fieldsFromType = function (document, _a) {
    var name = _a.name.value;
    return Document.findType(document, name).fold([], function (type) {
        return type.kind === "ObjectTypeDefinition" ||
            type.kind === "InterfaceTypeDefinition"
            ? prelude_1.Option.fromNullable(type.fields).getOrElse([])
            : [];
    });
};
//# sourceMappingURL=Interface.js.map