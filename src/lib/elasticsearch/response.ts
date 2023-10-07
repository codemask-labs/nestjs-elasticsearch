import { ApiResponse } from '@elastic/elasticsearch'
import { HitsMetadata } from '@elastic/elasticsearch/api/types'
import { Document } from 'lib/types'
import { SearchRequest } from './request'

export type ElasticsearchResult<TDocument extends Document> = {
    hits: HitsMetadata<TDocument>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    aggregations?: Record<string, any>
}

export const getSearchResponse = <TDocument extends Document>(request: SearchRequest<TDocument>) => ({ body }: ApiResponse<ElasticsearchResult<TDocument>>) => ({
    documents: body.hits.hits.map(({ _source: document }) => document),
    aggregations: body.aggregations,
    request,
    body
})
