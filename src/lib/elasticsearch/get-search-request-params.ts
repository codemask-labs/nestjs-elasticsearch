import { ClassConstructor, Document } from 'lib/common'
import { AggregationsContainer } from 'lib/aggregations'
import { SearchRequest, SearchRequestOptions, getSearchRequest } from 'lib/requests'

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
