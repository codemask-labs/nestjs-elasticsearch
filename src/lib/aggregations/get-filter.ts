import { Document } from 'lib/common'
import { BoolQuery, RangeQuery, TermQuery } from 'lib/queries'

export type QueryType<TDocument extends Document> = TermQuery<TDocument> | RangeQuery<TDocument> | BoolQuery<TDocument>

export type FilterAggregation<TDocument extends Document> = {
    filter: QueryType<TDocument>
}

/**
 * Builds an Elasticsearch `filter` aggregation that restricts the documents entering
 * a sub-aggregation to those matching the given query. Useful for scoping nested
 * aggregations to a filtered subset without affecting the parent result set.
 *
 * @param filter - A `term`, `range`, or `bool` query to use as the filter.
 * @returns A `FilterAggregation` object ready to be included in a search request's `aggregations`.
 */
export const getFilterAggregation = <TDocument extends Document>(filter: QueryType<TDocument>): FilterAggregation<TDocument> => ({
    filter,
})
