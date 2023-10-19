"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSumAggregation = void 0;
var getSumAggregation = function (field) { return ({
    sum: { field: field }
}); };
exports.getSumAggregation = getSumAggregation;
//# sourceMappingURL=get-sum.js.map