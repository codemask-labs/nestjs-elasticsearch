"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTermsQuery = void 0;
var getTermsQuery = function (field, values) {
    var _a;
    return ({
        terms: (_a = {}, _a[field] = values, _a)
    });
};
exports.getTermsQuery = getTermsQuery;
//# sourceMappingURL=get-terms.js.map