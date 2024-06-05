import { ClassConstructor, Document, Sort } from 'lib/common'
import { ELASTICSEARCH_INDEX_NAME_METADATA } from 'lib/constants'
import { BoolQuery } from 'lib/queries'
import { AggregationsContainer } from 'lib/aggregations'

export type SearchRequestOptions<TDocument extends Document, TAggregationsBody extends AggregationsContainer<TDocument>> = {
    size?: number
    from?: number
    query?: BoolQuery<TDocument>
    aggregations?: TAggregationsBody
    sort?: Sort<TDocument> | Array<Sort<TDocument>>
}

export type SearchRequest<TDocument extends Document, TAggregationsBody extends AggregationsContainer<TDocument>> = {
    index: string
    size?: number
    from?: number
    query?: BoolQuery<TDocument>
    aggregations?: TAggregationsBody
    sort?: Sort<TDocument> | Array<Sort<TDocument>>
}

export const getSearchRequest = <TDocument extends Document, TAggregationsBody extends AggregationsContainer<TDocument>>(
    document: ClassConstructor<TDocument>,
    options?: SearchRequestOptions<TDocument, TAggregationsBody>
): SearchRequest<TDocument, TAggregationsBody> => {
    const index = Reflect.getMetadata(ELASTICSEARCH_INDEX_NAME_METADATA, document)

    if (!index) {
        throw new Error(`Unregistered index name for ${document} schema.`)
    }

    const { size, from, query, aggregations, sort } = options || {}

    return {
        index,
        size,
        from,
        query,
        aggregations,
        sort
    }
}
