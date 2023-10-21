import type { ApiResponse } from '@elastic/elasticsearch'
import { ClassConstructor, Document, Result } from 'lib/common'
import { Aggregations } from 'lib/aggregations'
import { TransformedAggregations } from 'lib/transformers'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type SearchResponse<TDocument extends Document, TAggregationsBody extends Record<string, Aggregations<TDocument>>> = {
    documents: Array<TDocument>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    aggregations: TransformedAggregations<TDocument, TAggregationsBody>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getSearchResponse = <TDocument extends Document, TAggregationsBody extends Record<string, Aggregations<TDocument>>>(
    document: ClassConstructor<TDocument>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { body }: ApiResponse<Result<TDocument, TAggregationsBody>>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): SearchResponse<TDocument, TAggregationsBody> => ({
    documents: body.hits.hits.reduce((result, { _source: source }) => {
        if (!source) {
            return result
        }

        return [...result, Object.assign(new document(), source)]
    }, [] as Array<TDocument>),
    // eslint-disable-next-line @typescript-eslint/ban-types
    aggregations: (body.aggregations || {}) as TransformedAggregations<TDocument, TAggregationsBody>
})
