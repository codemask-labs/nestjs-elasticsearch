export type BucketSelectorAggregation = {
    bucket_selector: BucketSelectorAggregationBody
}

export type BucketSelectorAggregationBody = {
    buckets_path: Record<string, string>
    script: string
}

export const getBucketSelectorAggregation = (script: string, bucketsPath: Record<string, string>): BucketSelectorAggregation => ({
    bucket_selector: {
        buckets_path: bucketsPath,
        script,
    },
})
