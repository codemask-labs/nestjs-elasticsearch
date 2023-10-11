import { Document, Key } from 'lib/types'

export type AvgAggregationBody<TDocument extends Document> = {
    field: Key<TDocument>
}

export type AvgAggregation<TDocument extends Document> = {
    avg: AvgAggregationBody<TDocument>
}

export const getAvgAggregation = <TDocument extends Document>(field: Key<TDocument>): AvgAggregation<TDocument> => ({
    avg: { field }
})
