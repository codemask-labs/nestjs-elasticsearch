import { ClassConstructor, Document } from 'lib/common'
import { AggregationsContainer } from 'lib/aggregations'
import { SearchRequest, SearchRequestOptions, getSearchRequest } from 'lib/requests'

/**
 * Builds the Elasticsearch client search parameters from a document class and search options.
 * This is a thin adapter over `getSearchRequest` that extracts and returns only the fields
 * accepted by the underlying `@elastic/elasticsearch` client's `search` method.
 *
 * @param document - The document class decorated with `@RegisterIndex` that identifies the target index.
 * @param options - Optional search options including `query`, `aggregations`, `size`, `from`, `sort`, and `search_after`.
 * @returns A `SearchRequest` object ready to be passed directly to the Elasticsearch client.
 */
export const getSearchRequestParams = <TDocument extends Document, TAggregationsBody extends AggregationsContainer<TDocument>>(
    document: ClassConstructor<TDocument>,
    options?: SearchRequestOptions<TDocument, TAggregationsBody>,
): SearchRequest<TDocument, TAggregationsBody> => {
    const { index, size, from, query, aggregations, sort, search_after } = getSearchRequest<TDocument, TAggregationsBody>(document, options)

    return {
        index,
        size,
        from,
        query,
        aggregations,
        sort,
        search_after,
    }
}
