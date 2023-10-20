import { Injectable } from '@nestjs/common'
import { ClassConstructor, Document, ElasticsearchIndex } from 'lib/types'
import { Aggregations } from 'lib/aggregations'
import { SearchRequest } from 'lib/requests'
import { ElasticsearchService } from '..'

@Injectable()
export class Index<TDocument extends Document> implements ElasticsearchIndex<TDocument> {
    constructor(
        private readonly service: ElasticsearchService,
        private readonly document: ClassConstructor<TDocument>
    ) {}

    search<TAggregationsBody extends Record<string, Aggregations<TDocument>>>(options?: SearchRequest<TDocument, TAggregationsBody>) {
        return this.service.search<TDocument, TAggregationsBody>(this.document, options)
    }
}
