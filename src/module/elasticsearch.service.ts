import { Injectable } from '@nestjs/common'
import { RequestParams } from '@elastic/elasticsearch'
import { ElasticsearchService as BaseElasticsearchService } from '@nestjs/elasticsearch'
import { ClassConstructor, Document, Result } from 'lib/common'
import { AggregationList } from 'lib/aggregations'
import { SearchRequest } from 'lib/requests'
import { ClusterHealthResponse, getSearchResponse } from 'lib/responses'
import { getRequestParams } from 'lib/elasticsearch'
import { Index } from './injectables'

@Injectable()
export class ElasticsearchService {
    constructor(private readonly baseElasticsearchService: BaseElasticsearchService) {}

    search<TDocument extends Document, TAggregationsBody extends Record<string, AggregationList<TDocument>>>(
        document: ClassConstructor<TDocument>,
        options?: SearchRequest<TDocument, TAggregationsBody>
    ) {
        const params = getRequestParams<TDocument, TAggregationsBody>(document, options)

        return this.baseElasticsearchService
            .search<Result<TDocument, TAggregationsBody>>(params)
            .then(response => getSearchResponse(document, response))
    }

    getIndex<TDocument extends Document>(document: ClassConstructor<TDocument>) {
        return new Index(this, document)
    }

    getClusterHealth(options?: RequestParams.ClusterHealth): Promise<ClusterHealthResponse> {
        return this.baseElasticsearchService.cluster.health<ClusterHealthResponse>(options).then(response => response.body)
    }

    getBaseService(): BaseElasticsearchService {
        return this.baseElasticsearchService
    }
}
