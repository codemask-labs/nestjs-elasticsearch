import { Document, Key, Keys } from 'lib/common'
import { TermsAggregation } from './get-terms'
import { HistogramAggregation } from './get-histogram'
import { DateHistogramAggregation } from './get-date-histogram'

export type AfterKey<TDocument extends Document> = {
    [TKey in Key<TDocument>]?: Keys<TDocument>[TKey]
}

export type CompositeAggregationList<TDocument extends Document> =
    | TermsAggregation<TDocument>
    | HistogramAggregation<TDocument>
    | DateHistogramAggregation<TDocument>

export type CompositeAggregationOptions<TDocument extends Document> = {
    size?: number
    after?: AfterKey<TDocument>
}

export type CompositeAggregationSource<TDocument extends Document> = {
    [x: string]: CompositeAggregationList<TDocument>
}

export type CompositeAggregationBody<TDocument extends Document> = CompositeAggregationOptions<TDocument> & {
    sources: Array<CompositeAggregationSource<TDocument>>
}

export type CompositeAggregation<TDocument extends Document> = {
    composite: CompositeAggregationBody<TDocument>
}

/**
 * Builds an Elasticsearch `composite` aggregation that paginates through all buckets
 * from multiple aggregation sources (terms, histogram, date_histogram). Use `after`
 * in `options` with the previous response's `after_key` to fetch the next page.
 *
 * @param sources - An array of composite source objects, each mapping a name to a `terms`, `histogram`, or `date_histogram` aggregation.
 * @param options - Optional settings including `size` (buckets per page) and `after` (pagination cursor).
 * @returns A `CompositeAggregation` object ready to be included in a search request's `aggregations`.
 */
export const getCompositeAggregation = <TDocument extends Document>(
    sources: Array<CompositeAggregationSource<TDocument>>,
    options?: CompositeAggregationOptions<TDocument>,
): CompositeAggregation<TDocument> => ({
    composite: { sources, ...options },
})
