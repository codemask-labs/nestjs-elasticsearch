import type { ApiResponse } from '@elastic/elasticsearch'
import { ClassConstructor, Document, Result } from 'lib/common'
import { Aggregations } from 'lib/aggregations'
import { TransformedAggregations } from 'lib/transformers'

export type SearchResponse<TDocument extends Document, TAggregationsBody extends Record<string, Aggregations<TDocument>>> = {
    documents: Array<TDocument>
    aggregations: TransformedAggregations<TDocument, TAggregationsBody>
}

export const getSearchResponse = <TDocument extends Document, TAggregationsBody extends Record<string, Aggregations<TDocument>>>(
    document: ClassConstructor<TDocument>,
    { body }: ApiResponse<Result<TDocument, TAggregationsBody>>
): SearchResponse<TDocument, TAggregationsBody> => ({
    documents: body.hits.hits.reduce((result, { _source: source }) => {
        if (!source) {
            return result
        }

        return [...result, Object.assign(new document(), source)]
    }, [] as Array<TDocument>),
    aggregations: (body.aggregations || {}) as TransformedAggregations<TDocument, TAggregationsBody>
})
