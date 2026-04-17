import { Document, NumericField } from 'lib/common'

export type PercentileAggregationBody<TDocument extends Document> = {
    field: NumericField<TDocument>
    percents: Array<number>
}

export type PercentileAggregation<TDocument extends Document> = {
    percentiles: PercentileAggregationBody<TDocument>
}

/**
 * Builds an Elasticsearch `percentiles` aggregation that computes one or more percentile
 * values of a numeric field across all matching documents.
 *
 * @param field - The numeric document field to compute percentiles for.
 * @param percents - An array of percentile values to compute (e.g. `[25, 50, 75, 95, 99]`).
 * @returns A `PercentileAggregation` object ready to be included in a search request's `aggregations`.
 */
export const getPercentileAggregation = <TDocument extends Document>(
    field: NumericField<TDocument>,
    percents: Array<number>,
): PercentileAggregation<TDocument> => ({
    percentiles: {
        field,
        percents,
    },
})
