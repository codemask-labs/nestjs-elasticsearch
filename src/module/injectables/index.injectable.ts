import { Injectable } from '@nestjs/common'
import { ClassConstructor, Document } from 'lib/common'
import { AggregationsContainer } from 'lib/aggregations'
import { SearchRequestOptions } from 'lib/requests'
import { ElasticsearchService } from '../elasticsearch.service'
import { isIndexRegistered } from '../utils'

@Injectable()
export class Index<TDocument extends Document> {
    constructor(
        private readonly service: ElasticsearchService,
        private readonly document: ClassConstructor<TDocument>,
    ) {
        if (!isIndexRegistered(document)) {
            throw new Error(`[${document.name}] Failed to construct Index. Make sure the index document class is properly decorated with @RegisterIndex(name: string).`)
        }
    }

    search<TAggregationsBody extends AggregationsContainer<TDocument>>(options?: SearchRequestOptions<TDocument, TAggregationsBody>) {
        return this.service.search(this.document, options)
    }
}
