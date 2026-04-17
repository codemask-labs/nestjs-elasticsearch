export type BucketSelectorAggregation = {
    bucket_selector: BucketSelectorAggregationBody
}

export type BucketSelectorAggregationBody = {
    buckets_path: Record<string, string>
    script: string
}

/**
 * Builds an Elasticsearch `bucket_selector` aggregation that uses a Painless script
 * to determine whether a bucket should be retained in the response. Buckets where the
 * script evaluates to `false` are excluded from results.
 *
 * @param script - A Painless script string that returns a boolean (e.g. `'params.total > 100'`).
 * @param bucketsPath - A map of script variable names to sibling aggregation paths (e.g. `{ total: 'sum_agg' }`).
 * @returns A `BucketSelectorAggregation` object ready to be included in a search request's `aggregations`.
 */
export const getBucketSelectorAggregation = (script: string, bucketsPath: Record<string, string>): BucketSelectorAggregation => ({
    bucket_selector: {
        buckets_path: bucketsPath,
        script,
    },
})
