import type { RequestParams } from '@elastic/elasticsearch'
import { ClassConstructor, Document } from 'lib/common'
import { AggregationsContainer } from 'lib/aggregations'
import { SearchRequestOptions, getSearchRequest } from 'lib/requests'

export const getSearchRequestParams = <TDocument extends Document, TAggregationsBody extends AggregationsContainer<TDocument>>(
    document: ClassConstructor<TDocument>,
    options?: SearchRequestOptions<TDocument, TAggregationsBody>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
): RequestParams.Search<Record<string, any>> => {
    const { index, size, from, query, aggregations } = getSearchRequest<TDocument, TAggregationsBody>(document, options)

    return {
        index,
        size,
        from,
        body: {
            query,
            aggregations
        }
    }
}
