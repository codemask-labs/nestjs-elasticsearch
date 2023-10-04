import { Injectable } from '@nestjs/common'
import { ElasticsearchService as BaseElasticsearchService } from '@nestjs/elasticsearch'
import { ClassConstructor, Document, ElasticsearchCatalog } from 'lib/types'

@Injectable()
export class Catalog<TDocument extends Document> implements ElasticsearchCatalog {
    constructor(
        private readonly document: ClassConstructor<TDocument>,
        private readonly es: BaseElasticsearchService
    ) {}

    search() {}

    msearch() {}

    createQueryBuilder() {}
}
