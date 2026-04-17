import { Document, NumericField } from 'lib/common'

export type AvgAggregationBody<TDocument extends Document> = {
    field: NumericField<TDocument>
}

export type AvgAggregation<TDocument extends Document> = {
    avg: AvgAggregationBody<TDocument>
}

/**
 * Builds an Elasticsearch `avg` aggregation that computes the arithmetic mean
 * of numeric values extracted from the specified field across all matching documents.
 *
 * @param field - The numeric document field to average.
 * @returns An `AvgAggregation` object ready to be included in a search request's `aggregations`.
 */
export const getAvgAggregation = <TDocument extends Document>(field: NumericField<TDocument>): AvgAggregation<TDocument> => ({
    avg: { field },
})
