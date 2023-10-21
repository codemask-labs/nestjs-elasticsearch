import type { RequestParams } from '@elastic/elasticsearch'
import { Document } from 'lib/common'
import { BoolQuery } from 'lib/queries'
import { Aggregations } from 'lib/aggregations'

export type SearchRequest<TDocument extends Document, TAggregationsBody extends Record<string, Aggregations<TDocument>>> = {
    size?: number
    from?: number
    query?: BoolQuery<TDocument>
    aggregations?: TAggregationsBody
}

export const getSearchRequest = <TDocument extends Document, TAggregationsBody extends Record<string, Aggregations<TDocument>>>(
    index: string,
    options?: SearchRequest<TDocument, TAggregationsBody>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
): RequestParams.Search<Record<string, any>> => {
    const { size, from, query, aggregations } = options || {}

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
