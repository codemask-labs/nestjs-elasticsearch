"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIndexInjectionToken = void 0;
var constants_1 = require("../lib/constants");
var getIndexInjectionToken = function (index) { return "".concat(constants_1.ELASTICSEARCH_INDEX_PREFIX, ":").concat(index); };
exports.getIndexInjectionToken = getIndexInjectionToken;
//# sourceMappingURL=utils.js.map