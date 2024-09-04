// todo(slav): support key mappings
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CompositeAfterKey = Record<string, any>

export type CompositeBucket = {
    key: CompositeAfterKey
    doc_count: number
}

export type CompositeBuckets<TBucket> = {
    after_key?: CompositeAfterKey
    buckets: Array<TBucket>
}
