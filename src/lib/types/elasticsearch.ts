import { Key } from 'lib/types'
import { Order } from 'lib/enums'
import { SearchRequest } from 'lib/requests'
import { SearchResponse } from 'lib/responses'
import { Aggregations } from 'lib/aggregations'
import { Document } from './common'

export type ElasticsearchIndex<TDocument extends Document> = {
    /**
     *
     * @returns Promise<SearchResponse<TDocument>>
     */
    search: <TAggregationsBody extends Record<string, Aggregations<TDocument>>>(
        options?: SearchRequest<TDocument, TAggregationsBody>
    ) => Promise<SearchResponse<TDocument, TAggregationsBody>>
}

export type AggregationRange = {
    from?: number
    to?: number
}

export type Sort<TDocument extends Document> = {
    [X in Key<TDocument>]?: { order: Order }
}
