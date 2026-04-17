import { Document, ArrayOfObjectsField } from 'lib/common'

export type NestedAggregationBody<TDocument extends Document> = {
    path: ArrayOfObjectsField<TDocument>
}

export type NestedAggregation<TDocument extends Document> = {
    nested: NestedAggregationBody<TDocument>
}

/**
 * Builds an Elasticsearch `nested` aggregation that allows aggregating on fields inside
 * nested objects. Must wrap any aggregation that targets a field within a nested object type.
 *
 * @param path - The path to the nested object field on the document (must be a field typed as an array of objects).
 * @returns A `NestedAggregation` object ready to be included in a search request's `aggregations`.
 */
export const getNestedAggregation = <TDocument extends Document>(path: ArrayOfObjectsField<TDocument>): NestedAggregation<TDocument> => ({
    nested: {
        path,
    },
})
