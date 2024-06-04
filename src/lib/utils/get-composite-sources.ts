import { CompositeAggregationSource } from 'lib/aggregations'
import { Document } from 'lib/common'

export const getCompositeSources = <TDocument extends Document>(sources: Array<CompositeAggregationSource<TDocument>>) => [...sources]
