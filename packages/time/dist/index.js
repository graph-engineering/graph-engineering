"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tag_1 = __importDefault(require("graphql-tag"));
var FormattedDate = __importStar(require("./formatted-date"));
exports.FormattedDate = FormattedDate;
var FormattedDuration = __importStar(require("./formatted-duration"));
exports.FormattedDuration = FormattedDuration;
// export all typedefs together
exports.typeDefs = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\t", "\n\t", "\n"], ["\n\t", "\n\t", "\n"
    // export all resolvers together
])), FormattedDate.typeDefs, FormattedDuration.typeDefs);
// export all resolvers together
exports.resolvers = {
    FormattedDate: FormattedDate.resolvers,
    FormattedDuration: FormattedDuration.resolvers
};
var templateObject_1;
//# sourceMappingURL=index.js.map