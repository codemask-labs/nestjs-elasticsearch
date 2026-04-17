import { Document, Field } from 'lib/common'

export type GeoCentroidAggregationBody<TDocument extends Document> = {
    field: Field<TDocument>
}

export type GeoCentroidAggregation<TDocument extends Document> = {
    geo_centroid: GeoCentroidAggregationBody<TDocument>
}

/**
 * Builds an Elasticsearch `geo_centroid` aggregation that computes the geographic
 * centroid (weighted average of lat/lon coordinates) from a geo_point field
 * across all matching documents.
 *
 * @param field - The `geo_point` document field to compute the centroid from.
 * @returns A `GeoCentroidAggregation` object ready to be included in a search request's `aggregations`.
 */
export const getGeoCentroidAggregation = <TDocument extends Document>(field: Field<TDocument>): GeoCentroidAggregation<TDocument> => ({
    geo_centroid: {
        field,
    },
})
