"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTermQuery = void 0;
var getTermQuery = function (field, value) {
    var _a;
    return ({
        term: (_a = {}, _a[field] = { value: value }, _a)
    });
};
exports.getTermQuery = getTermQuery;
//# sourceMappingURL=get-term.js.map