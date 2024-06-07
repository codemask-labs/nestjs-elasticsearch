import { SearchResponse as BaseSearchResponse } from '@elastic/elasticsearch/lib/api/types'
import { ClassConstructor, Document } from 'lib/common'
import { AggregationsContainer } from 'lib/aggregations'
import { TransformedAggregations, getTransformedAggregations, getTransformedDocuments, getTransformedTotal } from 'lib/transformers'

export type SearchResponse<TDocument extends Document, TAggregationsBody extends AggregationsContainer<TDocument>> = {
    total: number
    documents: Array<TDocument>
    aggregations: TransformedAggregations<TDocument, TAggregationsBody>
}

export const getSearchResponse = <TDocument extends Document, TAggregationsBody extends AggregationsContainer<TDocument>>(
    document: ClassConstructor<TDocument>,
    { hits, aggregations }: BaseSearchResponse<TDocument, TAggregationsBody>
): SearchResponse<TDocument, TAggregationsBody> => ({
    total: getTransformedTotal(hits),
    documents: getTransformedDocuments(document, hits),
    aggregations: getTransformedAggregations(aggregations)
})
