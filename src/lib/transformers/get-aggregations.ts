import { Document } from 'lib/common'
import { AggregationsContainer } from 'lib/aggregations'
import { TransformedAggregations } from './types'
import { AggregateName, AggregationsAggregate } from '@elastic/elasticsearch/lib/api/types'

export const getTransformedAggregations = <TDocument extends Document, TAggregationsBody extends AggregationsContainer<TDocument>>(
    aggregations: Record<AggregateName, AggregationsAggregate> = {},
): TransformedAggregations<TDocument, TAggregationsBody> => aggregations as TransformedAggregations<TDocument, TAggregationsBody>
