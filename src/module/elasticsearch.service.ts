import { Injectable } from '@nestjs/common'
import { RequestParams } from '@elastic/elasticsearch'
import { ElasticsearchService as ElasticsearchBaseService } from '@nestjs/elasticsearch'
import { ClassConstructor, Document, Result } from 'lib/common'
import { AggregationList } from 'lib/aggregations'
import { getSearchRequest, SearchRequest } from 'lib/requests'
import { ClusterHealthResponse, getSearchResponse } from 'lib/responses'
import { Index } from './injectables'

@Injectable()
export class ElasticsearchService {
    constructor(private readonly elasticsearchBaseService: ElasticsearchBaseService) {}

    search<TDocument extends Document, TAggregationsBody extends Record<string, AggregationList<TDocument>>>(
        document: ClassConstructor<TDocument>,
        options?: SearchRequest<TDocument, TAggregationsBody>
    ) {
        const request = getSearchRequest<TDocument, TAggregationsBody>(document, options)

        return this.elasticsearchBaseService
            .search<Result<TDocument, TAggregationsBody>>(request)
            .then(response => getSearchResponse(document, response))
    }

    getIndex<TDocument extends Document>(document: ClassConstructor<TDocument>) {
        return new Index(this, document)
    }

    getClusterHealth(options?: RequestParams.ClusterHealth): Promise<ClusterHealthResponse> {
        return this.elasticsearchBaseService.cluster.health<ClusterHealthResponse>(options).then(response => response.body)
    }
}
