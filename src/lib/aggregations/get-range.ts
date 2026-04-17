import { Range, Document, NumericField } from 'lib/common'

export type RangeAggregationBody<TDocument extends Document> = {
    field: NumericField<TDocument>
    ranges: Array<Range>
}

export type RangeAggregation<TDocument extends Document> = {
    range: RangeAggregationBody<TDocument>
}

/**
 * Builds an Elasticsearch `range` aggregation that groups numeric values into
 * explicitly defined bucket ranges. Unlike `histogram`, ranges do not need to be
 * equal in size and can be arbitrary.
 *
 * @param field - The numeric document field to bucket by.
 * @param ranges - An array of `Range` objects defining the bucket boundaries (e.g. `{ from: 0, to: 100 }`).
 * @returns A `RangeAggregation` object ready to be included in a search request's `aggregations`.
 */
export const getRangeAggregation = <TDocument extends Document>(
    field: NumericField<TDocument>,
    ranges: Array<Range>,
): RangeAggregation<TDocument> => ({
    range: {
        field,
        ranges,
    },
})
