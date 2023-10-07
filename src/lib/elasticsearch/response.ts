import { ApiResponse } from '@elastic/elasticsearch'
import { HitsMetadata } from '@elastic/elasticsearch/api/types'
import { ClassConstructor, Document } from 'lib/types'

export type ElasticsearchResult<TDocument extends Document> = {
    hits: HitsMetadata<TDocument>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    aggregations?: Record<string, any>
}

export type SearchResponse<TDocument extends Document> = {
    documents: Array<TDocument>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    aggregations?: Record<string, any>
}

export const getSearchResponse = <
    TDocument extends Document
>(document: ClassConstructor<TDocument>, { body }: ApiResponse<ElasticsearchResult<TDocument>>): SearchResponse<TDocument> => ({
    documents: body.hits.hits.reduce(
        (result, { _source: source }) => {
            if (!source) {
                return result
            }

            return [
                ...result,
                Object.assign(new document(), source)
            ]
        },
        [] as Array<TDocument>
    ),
    aggregations: body.aggregations
})
