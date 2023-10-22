import { Document } from 'lib/common'
import { Aggregations } from 'lib/aggregations'
import { TransformedAggregations } from './types'

export const getTransformedAggregations = <
    TDocument extends Document,
    TAggregationsBody extends Record<string, Aggregations<TDocument>>
>(aggregations?: TransformedAggregations<TDocument, TAggregationsBody>): TransformedAggregations<TDocument, TAggregationsBody> => aggregations || {} as TransformedAggregations<TDocument, TAggregationsBody>
