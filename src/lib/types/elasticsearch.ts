import { SearchRequest, SearchResponse } from 'lib/elasticsearch'
import { Document } from './common'
import { AggregationsBody } from '..'

export type ElasticsearchIndex<TDocument extends Document> = {
    /**
     *
     * @returns Promise<SearchResponse<TDocument>>
     */
    search: <TAggregationsBody extends AggregationsBody<TDocument>>(options: SearchRequest<TDocument, TAggregationsBody>) => Promise<SearchResponse<TDocument, TAggregationsBody>>
}
