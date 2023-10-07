import { QueryBuilder } from 'lib/builders'
import { SearchOptions, SearchResponse } from 'lib/elasticsearch'
import { Document } from './common'

export type ElasticsearchCatalog<TDocument extends Document> = {
    /**
     *
     * @returns void
     */
    search: (options: SearchOptions<TDocument>) => Promise<SearchResponse<TDocument>>

    /**
     *
     * @returns QueryBuilder<TDocument>
     */
    createQueryBuilder: () => QueryBuilder<TDocument>
}
