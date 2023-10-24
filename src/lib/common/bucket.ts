export type Bucket<TKey = string> = {
    key: TKey
    key_as_string?: string
    doc_count: number
}

export type Buckets<TBucketKey, TBucket extends Bucket<TBucketKey>> = {
    buckets: Array<TBucket>
}
