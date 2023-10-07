import { QueryBuilder } from 'lib/builders'
import { getSearchResponse, SearchOptions } from 'lib/elasticsearch'
import { Document } from './common'

export type ElasticsearchCatalog<TDocument extends Document> = {
    /**
     *
     * @returns void
     */
    search: (options: SearchOptions<TDocument>) => Promise<ReturnType<typeof getSearchResponse<TDocument>>>

    /**
     *
     * @returns void
     */
    createQueryBuilder: () => QueryBuilder<TDocument>

    /**
     *
     * @returns void
     */
    checkDocumentIntegrity: () => void
}
