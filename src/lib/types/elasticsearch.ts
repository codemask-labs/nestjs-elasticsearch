import { SearchRequest, SearchResponse } from 'lib/elasticsearch'
import { AggregationsBody } from '..'
import { Document } from './common'

export type ElasticsearchIndex<TDocument extends Document> = {
    /**
     *
     * @returns Promise<SearchResponse<TDocument>>
     */
    search: <TAggregation extends AggregationsBody<TDocument>>(options: SearchRequest<TDocument, TAggregation>) => Promise<SearchResponse<TDocument>>
}
