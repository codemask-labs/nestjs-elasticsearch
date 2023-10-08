import { SearchOptions, SearchResponse } from 'lib/elasticsearch'
import { Document } from './common'

export type ElasticsearchIndex<TDocument extends Document> = {
    /**
     *
     * @returns Promise<SearchResponse<TDocument>>
     */
    search: (options: SearchOptions<TDocument>) => Promise<SearchResponse<TDocument>>
}
