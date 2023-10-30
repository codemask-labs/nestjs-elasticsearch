import { Bucket } from './bucket'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CompositeAfterKey = Record<string, any>

export type CompositeBucket = {
    key: CompositeAfterKey
    doc_count: number
}

export type CompositeBuckets = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    after_key?: CompositeAfterKey
    buckets: Array<Bucket<CompositeAfterKey>>
}
