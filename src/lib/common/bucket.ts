export type Bucket = {
    key: string
    doc_count: number
}

export type Buckets<TBucket> = {
    buckets: Array<TBucket>
}
