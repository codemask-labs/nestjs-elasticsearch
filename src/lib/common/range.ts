export type Range = {
    from?: number
    to?: number
}

export type RangeBucket<TKey = string> = {
    key: TKey
    doc_count: number
} & Range

export type RangeBuckets = {
    buckets: Array<RangeBucket>
}
