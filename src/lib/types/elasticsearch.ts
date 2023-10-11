import { SearchRequest, SearchResponse } from 'lib/elasticsearch'
import { Document } from './common'

export type ElasticsearchIndex<TDocument extends Document> = {
    /**
     *
     * @returns Promise<SearchResponse<TDocument>>
     */
    search: <TAggregationKeys extends string>(options: SearchRequest<TDocument, TAggregationKeys>) => Promise<SearchResponse<TDocument>>
}
