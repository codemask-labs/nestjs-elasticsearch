import { Document, Field } from 'lib/common'

export type ValueCountAggregationBody<TDocument extends Document> = {
    field: Field<TDocument>
}

export type ValueCountAggregation<TDocument extends Document> = {
    value_count: ValueCountAggregationBody<TDocument>
}

/**
 * Builds an Elasticsearch `value_count` aggregation that counts the number of values
 * extracted from the specified field across all matching documents. Unlike `cardinality`,
 * this counts all values including duplicates.
 *
 * @param field - The document field to count values for.
 * @returns A `ValueCountAggregation` object ready to be included in a search request's `aggregations`.
 */
export const getValueCountAggregation = <TDocument extends Document>(field: Field<TDocument>): ValueCountAggregation<TDocument> => ({
    value_count: {
        field,
    },
})
