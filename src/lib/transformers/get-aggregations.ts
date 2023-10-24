import { Document } from 'lib/common'
import { AggregationsContainer } from 'lib/aggregations'
import { TransformedAggregations } from './types'

export const getTransformedAggregations = <
    TDocument extends Document,
    TAggregationsBody extends AggregationsContainer<TDocument>
>(aggregations?: TransformedAggregations<TDocument, TAggregationsBody>): TransformedAggregations<TDocument, TAggregationsBody> => aggregations || {} as TransformedAggregations<TDocument, TAggregationsBody>
