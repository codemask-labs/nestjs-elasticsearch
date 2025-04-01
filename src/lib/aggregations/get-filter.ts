import { Document } from 'lib/common'
import { BoolQuery, RangeQuery, TermQuery } from 'lib/queries'

export type QueryType<TDocument extends Document> = TermQuery<TDocument> | RangeQuery<TDocument> | BoolQuery<TDocument>

export type FilterAggregation<TDocument extends Document> = {
    filter: QueryType<TDocument>
}

export const getFilterAggregation = <TDocument extends Document>(filter: QueryType<TDocument>): FilterAggregation<TDocument> => ({
    filter,
})
