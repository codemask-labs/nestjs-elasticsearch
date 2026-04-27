import { CompositeAggregationSource } from 'lib/aggregations'
import { Document } from 'lib/common'

/**
 * Returns a shallow copy of the composite aggregation sources array.
 * Use this to safely construct the `sources` parameter for `getCompositeAggregation`
 * from an existing array without mutating the original.
 *
 * @param sources - An array of composite aggregation source objects.
 * @returns A new array containing the same composite aggregation source objects.
 */
export const getCompositeSources = <TDocument extends Document>(sources: Array<CompositeAggregationSource<TDocument>>) => [...sources]
