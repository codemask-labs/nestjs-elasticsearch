import { ClassConstructor, Document, Sort } from 'lib/common'
import { BoolQuery } from 'lib/queries'
import { AggregationsContainer } from 'lib/aggregations'
import { getIndexName } from 'module/utils'

export type SearchRequestOptions<TDocument extends Document, TAggregationsBody extends AggregationsContainer<TDocument>> = {
    size?: number
    from?: number
    query?: BoolQuery<TDocument>
    aggregations?: TAggregationsBody
    sort?: Sort<TDocument> | Array<Sort<TDocument>>
    search_after?: Array<any> // eslint-disable-line @typescript-eslint/no-explicit-any
}

export type SearchRequest<TDocument extends Document, TAggregationsBody extends AggregationsContainer<TDocument>> = {
    index: string
    size?: number
    from?: number
    query?: BoolQuery<TDocument>
    aggregations?: TAggregationsBody
    sort?: Sort<TDocument> | Array<Sort<TDocument>>
    search_after?: Array<any> // eslint-disable-line @typescript-eslint/no-explicit-any
}

export const getSearchRequest = <TDocument extends Document, TAggregationsBody extends AggregationsContainer<TDocument>>(
    document: ClassConstructor<TDocument>,
    options?: SearchRequestOptions<TDocument, TAggregationsBody>,
): SearchRequest<TDocument, TAggregationsBody> => {
    const index = getIndexName(document)
    const { size, from, query, aggregations, sort, search_after } = options ?? {}

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
