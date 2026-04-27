export type BucketScriptAggregation = {
    bucket_script: BucketScriptAggregationBody
}

export type BucketScriptAggregationBody = {
    buckets_path: Record<string, string>
    script: string
}

/**
 * Builds an Elasticsearch `bucket_script` aggregation that executes a Painless script
 * on per-bucket metric values to compute a new derived metric. The script can reference
 * other sibling aggregations via `bucketsPath`.
 *
 * @param script - A Painless script string that computes the derived value (e.g. `'params.total / params.count'`).
 * @param bucketsPath - A map of script variable names to sibling aggregation paths (e.g. `{ total: 'sum_agg', count: 'count_agg' }`).
 * @returns A `BucketScriptAggregation` object ready to be included in a search request's `aggregations`.
 */
export const getBucketScriptAggregation = (script: string, bucketsPath: Record<string, string>): BucketScriptAggregation => ({
    bucket_script: {
        buckets_path: bucketsPath,
        script,
    },
})
