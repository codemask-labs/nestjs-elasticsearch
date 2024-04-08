import type { RequestParams } from '@elastic/elasticsearch'
import { ClassConstructor, Document } from 'lib/common'
import { ELASTICSEARCH_INDEX_NAME_METADATA } from 'lib/constants'
import { BoolQuery } from 'lib/queries'
import { AggregationsContainer } from 'lib/aggregations'

export type SearchRequest<TDocument extends Document, TAggregationsBody extends AggregationsContainer<TDocument>> = {
    size?: number
    from?: number
    query?: BoolQuery<TDocument>
    aggregations?: TAggregationsBody
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getSearchRequest = <TDocument extends Document, TAggregationsBody extends AggregationsContainer<TDocument>>(document: ClassConstructor<TDocument>, options?: SearchRequest<TDocument, TAggregationsBody>): RequestParams.Search<Record<string, any>> => {
    const index = Reflect.getMetadata(ELASTICSEARCH_INDEX_NAME_METADATA, document)

    if (!index) {
        throw new Error(`Unregistered index name for ${document} schema.`)
    }

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
