import type { ApiResponse } from '@elastic/elasticsearch'
import { ClassConstructor, Document, Result } from 'lib/common'
import { Aggregations } from 'lib/aggregations'
import { TransformedAggregations, getTransformedAggregations, getTransformedDocuments, getTransformedTotal } from 'lib/transformers'

export type SearchResponse<TDocument extends Document, TAggregationsBody extends Record<string, Aggregations<TDocument>>> = {
    total: number
    documents: Array<TDocument>
    aggregations: TransformedAggregations<TDocument, TAggregationsBody>
}

export const getSearchResponse = <TDocument extends Document, TAggregationsBody extends Record<string, Aggregations<TDocument>>>(
    document: ClassConstructor<TDocument>,
    { body }: ApiResponse<Result<TDocument, TAggregationsBody>>
): SearchResponse<TDocument, TAggregationsBody> => ({
    total: getTransformedTotal(body.hits),
    documents: getTransformedDocuments(document, body.hits),
    aggregations: getTransformedAggregations(body.aggregations)
})
