import { Document, Field } from 'lib/common'

export type MissingValueAggregationBody<TDocument extends Document> = {
    field: Field<TDocument>
}

export type MissingValueAggregation<TDocument extends Document> = {
    missing: MissingValueAggregationBody<TDocument>
}

/**
 * Builds an Elasticsearch `missing` aggregation that creates a single bucket containing
 * all documents where the specified field has no value (is null or missing entirely).
 * Useful for auditing data quality or handling incomplete records.
 *
 * @param field - The document field to check for missing values.
 * @returns A `MissingValueAggregation` object ready to be included in a search request's `aggregations`.
 */
export const getMissingValueAggregation = <TDocument extends Document>(field: Field<TDocument>): MissingValueAggregation<TDocument> => ({
    missing: { field },
})
