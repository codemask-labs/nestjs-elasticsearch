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
exports.ElasticsearchService = void 0;
var common_1 = require("@nestjs/common");
var elasticsearch_1 = require("@nestjs/elasticsearch");
var constants_1 = require("../lib/constants");
var elasticsearch_2 = require("../lib/elasticsearch");
var injectables_1 = require("./injectables");
var ElasticsearchService = (function () {
    function ElasticsearchService(elasticsearchBaseService) {
        this.elasticsearchBaseService = elasticsearchBaseService;
    }
    ElasticsearchService.prototype.search = function (document, options) {
        var index = Reflect.getMetadata(constants_1.ELASTICSEARCH_INDEX_NAME_METADATA, document);
        if (!index) {
            throw new Error('Failed to find Index Name');
        }
        var request = (0, elasticsearch_2.getSearchRequest)(index, options);
        return this.elasticsearchBaseService.search(request).then(function (response) { return (0, elasticsearch_2.getSearchResponse)(document, response); });
    };
    ElasticsearchService.prototype.getIndex = function (document) {
        return new injectables_1.Index(this, document);
    };
    ElasticsearchService = __decorate([
        (0, common_1.Injectable)(),
        __metadata("design:paramtypes", [elasticsearch_1.ElasticsearchService])
    ], ElasticsearchService);
    return ElasticsearchService;
}());
exports.ElasticsearchService = ElasticsearchService;
//# sourceMappingURL=elasticsearch.service.js.map