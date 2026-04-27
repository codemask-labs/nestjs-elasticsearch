import { Injectable } from '@nestjs/common'
import { ClusterHealthHealthResponseBody, ClusterHealthRequest } from '@elastic/elasticsearch/lib/api/types'
import { ElasticsearchService as BaseElasticsearchService } from '@nestjs/elasticsearch'
import { ClassConstructor, Document } from 'lib/common'
import { AggregationsContainer } from 'lib/aggregations'
import { SearchRequestOptions } from 'lib/requests'
import { getSearchResponse } from 'lib/responses'
import { getSearchRequestParams } from 'lib/elasticsearch'
import { Index } from './injectables'

@Injectable()
export class ElasticsearchService {
    constructor(private readonly baseElasticsearchService: BaseElasticsearchService) {}

    /**
     * Executes a search against the Elasticsearch index associated with the given document class.
     * Returns a typed `SearchResponse` with total hit count, documents, and transformed aggregations.
     *
     * @param document - The document class decorated with `@RegisterIndex` that identifies the target index.
     * @param options - Optional search options including `query`, `aggregations`, `size`, `from`, `sort`, and `search_after`.
     * @returns A promise resolving to `SearchResponse<TDocument, TAggregationsBody>` with typed hits and aggregations.
     */
    search<TDocument extends Document, TAggregationsBody extends AggregationsContainer<TDocument>>(
        document: ClassConstructor<TDocument>,
        options?: SearchRequestOptions<TDocument, TAggregationsBody>,
    ) {
        const params = getSearchRequestParams(document, options)

        return this.baseElasticsearchService.search<TDocument, TAggregationsBody>(params).then(response => getSearchResponse(document, response))
    }

    /**
     * Creates and returns a typed `Index<TDocument>` instance for the given document class.
     * Use this when you need a programmatic handle to an index outside of NestJS DI.
     * Prefer `@InjectIndex` for standard service injection.
     *
     * @param document - The document class decorated with `@RegisterIndex`.
     * @returns A new `Index<TDocument>` instance bound to this service.
     */
    getIndex<TDocument extends Document>(document: ClassConstructor<TDocument>) {
        return new Index(this, document)
    }

    /**
     * Returns the Elasticsearch cluster health status.
     *
     * @param options - Optional cluster health request parameters (e.g. `index`, `timeout`, `wait_for_status`).
     * @returns A promise resolving to the cluster health response body.
     */
    getClusterHealth(options?: ClusterHealthRequest): Promise<ClusterHealthHealthResponseBody> {
        return this.baseElasticsearchService.cluster.health(options)
    }

    /**
     * Returns the underlying `@nestjs/elasticsearch` service instance.
     * Use this to access Elasticsearch APIs not yet wrapped by this library.
     *
     * @returns The base `ElasticsearchService` from `@nestjs/elasticsearch`.
     */
    getBaseService(): BaseElasticsearchService {
        return this.baseElasticsearchService
    }
}
