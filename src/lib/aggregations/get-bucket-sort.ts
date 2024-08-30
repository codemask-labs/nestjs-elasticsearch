import { Order } from 'lib/enums'

export type BucketSortAggregation = {
    bucket_sort: BucketSortAggregationBody
}

export type BucketSort = {
    [bucketPath: string]: { order: Order }
}

/**
 * @description all field are optional, because
 * you can use bucket sort for both sorting and truncating result buckets,
 * but you also can use it for only sorting or only truncating
*/
export type BucketSortAggregationBody = {
    sort?: Array<BucketSort>
    from?: number
    size?: number
}

export const getBucketSortAggregation = (parameters: BucketSortAggregationBody): BucketSortAggregation => ({
    bucket_sort: parameters
})
