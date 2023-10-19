"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShouldNotQuery = void 0;
var queries_1 = require("../queries");
var getShouldNotQuery = function (body) { return (0, queries_1.getShouldQuery)((0, queries_1.getBoolQuery)((0, queries_1.getMustNotQuery)(body))); };
exports.getShouldNotQuery = getShouldNotQuery;
//# sourceMappingURL=get-should-not.js.map