"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Index = void 0;
var common_1 = require("@nestjs/common");
var __1 = require("..");
var Index = (function () {
    function Index(service, document) {
        this.service = service;
        this.document = document;
    }
    Index.prototype.search = function (options) {
        return this.service.search(this.document, options);
    };
    Index = __decorate([
        (0, common_1.Injectable)(),
        __metadata("design:paramtypes", [__1.ElasticsearchService, Object])
    ], Index);
    return Index;
}());
exports.Index = Index;
//# sourceMappingURL=index.injectable.js.map