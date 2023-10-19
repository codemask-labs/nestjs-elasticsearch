"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValueCountAggregation = void 0;
var getValueCountAggregation = function (field) { return ({
    value_count: { field: field }
}); };
exports.getValueCountAggregation = getValueCountAggregation;
//# sourceMappingURL=get-value-count.js.map