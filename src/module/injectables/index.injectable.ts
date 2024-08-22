import { Injectable } from '@nestjs/common'
import { ClassConstructor, Document } from 'lib/common'
import { AggregationsContainer } from 'lib/aggregations'
import { SearchRequestOptions } from 'lib/requests'
import { ElasticsearchService } from '../elasticsearch.service'

@Injectable()
export class Index<TDocument extends Document> {
    constructor(
        private readonly service: ElasticsearchService,
        private readonly document: ClassConstructor<TDocument>
    ) {}

    search<TAggregationsBody extends AggregationsContainer<TDocument>>(options?: SearchRequestOptions<TDocument, TAggregationsBody>) {
        return this.service.search(this.document, options)
    }
}
