"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMissingValueAggregation = void 0;
var getMissingValueAggregation = function (field) { return ({
    missing: { field: field }
}); };
exports.getMissingValueAggregation = getMissingValueAggregation;
//# sourceMappingURL=get-missing-value.js.map