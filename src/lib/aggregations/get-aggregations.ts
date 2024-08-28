import { ClassConstructor, Document } from 'lib/common'
import { AggregationsContainer } from './types'

type ExtractClassConstructors<T extends ClassConstructor<Document>> =
    T extends ClassConstructor<infer T> ? 'class constructor' : 'not class constructor'

export const getAggregations = <
    TDocument extends ClassConstructor<Document>,
    TAggregationsBody extends AggregationsContainer<ExtractClassConstructors<TDocument>>
>(
    _document: TDocument,
    aggregations: TAggregationsBody
) => aggregations
