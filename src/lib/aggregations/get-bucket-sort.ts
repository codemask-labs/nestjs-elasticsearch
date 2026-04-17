import { Order } from 'lib/enums'

export type BucketSortAggregation = {
    bucket_sort: BucketSortAggregationBody
}

export type BucketSort = {
    [bucketPath: string]: { order: Order }
}

/**
 * All fields are optional: use `bucket_sort` for sorting, truncating result buckets, or both.
 */
export type BucketSortAggregationBody = {
    sort?: Array<BucketSort>
    from?: number
    size?: number
}

/**
 * Builds an Elasticsearch `bucket_sort` aggregation that sorts and/or paginates the buckets
 * of a parent aggregation. All parameters are optional: you can use it purely for sorting,
 * purely for truncating (via `size`/`from`), or both.
 *
 * @param parameters - Optional sort and pagination settings: `sort` (array of bucket sort criteria), `from` (bucket offset), and `size` (max buckets to return).
 * @returns A `BucketSortAggregation` object ready to be included in a search request's `aggregations`.
 */
export const getBucketSortAggregation = (parameters: BucketSortAggregationBody = {}): BucketSortAggregation => ({
    bucket_sort: parameters,
})
