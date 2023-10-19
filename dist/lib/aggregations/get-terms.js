"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTermsAggregation = void 0;
var getTermsAggregation = function (field, size) {
    if (size === void 0) { size = 10; }
    return ({
        terms: {
            field: field,
            size: size
        }
    });
};
exports.getTermsAggregation = getTermsAggregation;
//# sourceMappingURL=get-terms.js.map