import { Injectable } from '@nestjs/common'
import { ClassConstructor, Document, ElasticsearchCatalog } from 'lib/types'
import { SearchOptions } from 'lib/elasticsearch'
import { ElasticsearchService } from '..'

@Injectable()
export class Catalog<TDocument extends Document> implements ElasticsearchCatalog<TDocument> {
    constructor(
        private readonly service: ElasticsearchService,
        private readonly document: ClassConstructor<TDocument>
    ) {}

    search(options: SearchOptions<TDocument>) {
        return this.service.search(this.document, options)
    }
}
