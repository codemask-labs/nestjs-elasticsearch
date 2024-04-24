export type StatsBucketAggregationBody = {
    stats_bucket: StatsBucketAggregation
}

export type StatsBucketAggregation = {
    buckets_path: string
}

export const getStatsBucketAggregation = (aggregation: string): StatsBucketAggregationBody => ({
    stats_bucket: {
        buckets_path: aggregation
    }
})
