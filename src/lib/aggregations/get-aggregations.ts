import { ClassConstructor, Document } from 'lib/common'
import { AggregationsContainer } from './types'

export const getAggregations = <TDocument extends Document, TAggregationsBody extends AggregationsContainer<TDocument>>(
    _document: ClassConstructor<TDocument>,
    aggregations: TAggregationsBody
) => aggregations
