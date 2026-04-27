import { SearchResponse as BaseSearchResponse } from '@elastic/elasticsearch/lib/api/types'
import { ClassConstructor, Document } from 'lib/common'
import { AggregationsContainer } from 'lib/aggregations'
import { TDocumentWrapper, TransformedAggregations, getTransformedAggregations, getTransformedDocuments, getTransformedTotal } from 'lib/transformers'

export type SearchResponse<TDocument extends Document, TAggregationsBody extends AggregationsContainer<TDocument>> = {
    total: number
    documents: Array<TDocumentWrapper<TDocument>>
    aggregations: TransformedAggregations<TDocument, TAggregationsBody>
}

/**
 * Transforms a raw Elasticsearch search response into the typed `SearchResponse` shape.
 * Extracts the total hit count, instantiates each hit's `_source` as the document class,
 * and casts aggregations to the typed `TransformedAggregations` shape inferred from
 * the search request's `aggregations` parameter.
 *
 * @param document - The document class constructor used to instantiate each returned hit.
 * @param response - The raw search response from the Elasticsearch client.
 * @returns A `SearchResponse<TDocument, TAggregationsBody>` containing `total`, `documents`, and `aggregations`.
 */
export const getSearchResponse = <TDocument extends Document, TAggregationsBody extends AggregationsContainer<TDocument>>(
    document: ClassConstructor<TDocument>,
    { hits, aggregations }: BaseSearchResponse<TDocument, TAggregationsBody>,
): SearchResponse<TDocument, TAggregationsBody> => ({
    total: getTransformedTotal(hits),
    documents: getTransformedDocuments(document, hits),
    aggregations: getTransformedAggregations(aggregations),
})
