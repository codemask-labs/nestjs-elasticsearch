import { Search } from '@elastic/elasticsearch/api/requestParams'
import { Document } from 'lib/types'
import { BoolQuery, AggregationsBody } from '..'

export type SearchRequest<TDocument extends Document, TAggregationKeys extends string> = {
    size?: number
    from?: number
    query?: BoolQuery<TDocument>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    aggregations?: AggregationsBody<TDocument, TAggregationKeys>
}

export const getSearchRequest = <TDocument extends Document, TAggregationKeys extends string>(
    index: string,
    options?: SearchRequest<TDocument, TAggregationKeys>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Search<Record<string, any>> => {
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
