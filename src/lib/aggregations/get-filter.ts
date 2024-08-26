import { Document } from 'lib/common'
import { RangeQuery, TermQuery } from 'lib/queries'

export type QueryType<TDocument extends Document> = TermQuery<TDocument> | RangeQuery<TDocument>

export type FilterAggregation<TDocument extends Document> = {
    filter: TermQuery<TDocument> | RangeQuery<TDocument>
}

export const getFilterAggregation = <TDocument extends Document>(query: QueryType<TDocument>): FilterAggregation<TDocument> => ({
    filter: query
})
