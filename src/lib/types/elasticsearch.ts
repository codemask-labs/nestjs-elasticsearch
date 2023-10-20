import { SearchRequest } from 'lib/requests'
import { SearchResponse } from 'lib/responses'
import { Document } from './common'
import { Aggregations } from '..'

export type ElasticsearchIndex<TDocument extends Document> = {
    /**
     *
     * @returns Promise<SearchResponse<TDocument>>
     */
    search: <TAggregationsBody extends Record<string, Aggregations<TDocument>>>(
        options?: SearchRequest<TDocument, TAggregationsBody>
    ) => Promise<SearchResponse<TDocument, TAggregationsBody>>
}
