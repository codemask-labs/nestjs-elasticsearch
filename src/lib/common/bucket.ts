export type Bucket = {
    key: string
    key_as_string?: string
    doc_count: number
}

export type Buckets<TBucket> = {
    buckets: Array<TBucket>
}
