export type BucketScriptAggregation = {
    bucket_script: BucketScriptAggregationBody
}

export type BucketScriptAggregationBody = {
    buckets_path: Record<string, string>
    script: string
}

export const getBucketScriptAggregation = (script: string, bucketsPath: Record<string, string>): BucketScriptAggregation => ({
    bucket_script: {
        buckets_path: bucketsPath,
        script
    }
})
