export type StatsBucketAggregation = {
    stats_bucket: StatsBucketAggregationBody
}

export type StatsBucketAggregationBody = {
    buckets_path: string
}

export const getStatsBucketAggregation = (path: string): StatsBucketAggregation => ({
    stats_bucket: {
        buckets_path: path,
    },
})
