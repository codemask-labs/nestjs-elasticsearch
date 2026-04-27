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
            throw new Error(
                `[${document.name}] Failed to construct Index. Make sure the index document class is properly decorated with @RegisterIndex(name: string).`,
            )
        }
    }

    /**
     * Executes a typed search against the Elasticsearch index for this document class.
     * Aggregation result types are inferred from the `aggregations` shape passed in `options`.
     *
     * @param options - Optional search options including `query`, `aggregations`, `size`, `from`, `sort`, and `search_after`.
     * @returns A promise resolving to `SearchResponse<TDocument, TAggregationsBody>` with typed hits and aggregations.
     */
    search<TAggregationsBody extends AggregationsContainer<TDocument>>(options?: SearchRequestOptions<TDocument, TAggregationsBody>) {
        return this.service.search(this.document, options)
    }
}
