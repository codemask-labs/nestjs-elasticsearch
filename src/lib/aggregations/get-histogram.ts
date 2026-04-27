import { Document, NumericField } from 'lib/common'

export type HistogramAggregationOptions = {
    /**
     * @description By default all buckets are returned, even those with 0 documents.
     */
    min_doc_count?: number
}

export type HistogramAggregationBody<TDocument extends Document> = {
    field: NumericField<TDocument>
    interval: number
}

export type HistogramAggregation<TDocument extends Document> = {
    histogram: HistogramAggregationBody<TDocument>
}

/**
 * Builds an Elasticsearch `histogram` aggregation that groups numeric values into fixed-width
 * buckets of the given interval. Can also be used as a source inside `getCompositeAggregation`.
 *
 * @param field - The numeric document field to bucket by.
 * @param interval - The fixed bucket width (e.g. `100` groups values into 0–99, 100–199, etc.).
 * @param options - Optional settings such as `min_doc_count` to exclude empty buckets.
 * @returns A `HistogramAggregation` object ready to be included in a search request's `aggregations`.
 */
export const getHistogramAggregation = <TDocument extends Document>(
    field: NumericField<TDocument>,
    interval: number,
    options?: HistogramAggregationOptions,
): HistogramAggregation<TDocument> => ({
    histogram: {
        field,
        interval,
        ...options,
    },
})
