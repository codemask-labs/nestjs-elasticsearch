import { Injectable } from '@nestjs/common'
import { ClassConstructor, Document } from 'lib/types'
import { Aggregations } from 'lib/aggregations'
import { SearchRequest } from 'lib/requests'
import { ElasticsearchService } from '../elasticsearch.service'

@Injectable()
export class Index<TDocument extends Document> {
    constructor(
        private readonly service: ElasticsearchService,
        private readonly document: ClassConstructor<TDocument>
    ) {}

    search<TAggregationsBody extends Record<string, Aggregations<TDocument>>>(options?: SearchRequest<TDocument, TAggregationsBody>) {
        return this.service.search<TDocument, TAggregationsBody>(this.document, options)
    }
}
