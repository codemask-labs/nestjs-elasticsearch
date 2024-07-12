import type { ApiResponse } from '@elastic/elasticsearch'
import { ClassConstructor, Document, Result } from 'lib/common'
import { AggregationsContainer } from 'lib/aggregations'
import { TransformedAggregations, getTransformedAggregations, getTransformedDocuments, getTransformedTotal } from 'lib/transformers'

export type SearchResponse<TDocument extends Document, TAggregationsBody extends AggregationsContainer<TDocument>> = {
    total: number
    documents: Array<TDocument>
    aggregations: TransformedAggregations<TDocument, TAggregationsBody>
    sort?: Array<any> // eslint-disable-line @typescript-eslint/no-explicit-any
}

export const getSearchResponse = <TDocument extends Document, TAggregationsBody extends AggregationsContainer<TDocument>>(
    document: ClassConstructor<TDocument>,
    { body }: ApiResponse<Result<TDocument, TAggregationsBody>>
): SearchResponse<TDocument, TAggregationsBody> => ({
    total: getTransformedTotal(body.hits),
    documents: getTransformedDocuments(document, body.hits),
    sort: body.hits.sort,
    aggregations: getTransformedAggregations(body.aggregations)
})
