import { Bucket } from './bucket'

export type Buckets<TBucketKey, TBucket extends Bucket<TBucketKey>> = {
    buckets: Array<TBucket>
}
