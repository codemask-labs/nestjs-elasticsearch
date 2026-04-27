export type StatsBucketAggregation = {
    stats_bucket: StatsBucketAggregationBody
}

export type StatsBucketAggregationBody = {
    buckets_path: string
}

/**
 * Builds an Elasticsearch `stats_bucket` pipeline aggregation that computes statistics
 * (min, max, sum, count, avg) across all bucket values of a sibling aggregation.
 *
 * @param path - The `buckets_path` pointing to the sibling aggregation metric (e.g. `'sales_per_month>total_sales'`).
 * @returns A `StatsBucketAggregation` object ready to be included in a search request's `aggregations`.
 */
export const getStatsBucketAggregation = (path: string): StatsBucketAggregation => ({
    stats_bucket: {
        buckets_path: path,
    },
})
