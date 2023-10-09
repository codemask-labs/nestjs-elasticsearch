import { Search } from '@elastic/elasticsearch/api/requestParams'
import { Document } from 'lib/types'
import { BoolQuery } from '..'

export type SearchRequest<TDocument extends Document> = {
    size?: number
    from?: number
    query?: BoolQuery<TDocument>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    aggregations?: Record<string, any>
}

export const getSearchRequest = <TDocument extends Document>(
    index: string,
    options?: SearchRequest<TDocument>
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
