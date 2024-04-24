export type StatsBucketAggregation = {
    stats_bucket: StatsBucketAggregationBody
}

export type StatsBucketAggregationBody = {
    buckets_path: string
}

export const getStatsBucketAggregation = (path: string): StatsBucketAggregation => ({
    // eslint-disable-next-line camelcase
    stats_bucket: {
        // eslint-disable-next-line camelcase
        buckets_path: path
    }
})
