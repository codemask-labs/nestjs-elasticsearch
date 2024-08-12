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

    search<TDocument extends Document, TAggregationsBody extends AggregationsContainer<TDocument>>(
        document: ClassConstructor<TDocument>,
        options?: SearchRequestOptions<TDocument, TAggregationsBody>
    ) {
        const params = getSearchRequestParams(document, options)

        return this.baseElasticsearchService.search<TDocument, TAggregationsBody>(params).then(response => getSearchResponse(document, response))
    }

    getIndex<TDocument extends Document>(document: ClassConstructor<TDocument>) {
        return new Index(this, document)
    }

    getClusterHealth(options?: ClusterHealthRequest): Promise<ClusterHealthHealthResponseBody> {
        return this.baseElasticsearchService.cluster.health(options)
    }

    getBaseService(): BaseElasticsearchService {
        return this.baseElasticsearchService
    }
}
