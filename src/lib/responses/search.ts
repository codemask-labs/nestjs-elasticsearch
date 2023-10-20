import type { estypes, ApiResponse } from '@elastic/elasticsearch'
import { ClassConstructor, Document } from 'lib/types'
import { Aggregations, AggregationsBody } from 'lib/aggregations'

export type ElasticsearchResult<TDocument extends Document, TAggregationsBody extends Record<string, Aggregations<TDocument>>> = {
    hits: estypes.HitsMetadata<TDocument>
    aggregations?: AggregationsBody<TDocument, TAggregationsBody>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type SearchResponse<TDocument extends Document, TAggregationsBody extends Record<string, Aggregations<TDocument>>> = {
    documents: Array<TDocument>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    aggregations: Record<string, any>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getSearchResponse = <TDocument extends Document, TAggregationsBody extends Record<string, Aggregations<TDocument>>>(
    document: ClassConstructor<TDocument>,
    { body }: ApiResponse<ElasticsearchResult<TDocument, TAggregationsBody>>
): SearchResponse<TDocument, TAggregationsBody> => ({
    documents: body.hits.hits.reduce((result, { _source: source }) => {
        if (!source) {
            return result
        }

        return [...result, Object.assign(new document(), source)]
    }, [] as Array<TDocument>),
    aggregations: (body.aggregations || {}) as AggregationsBody<TDocument, TAggregationsBody>
})