import { Document, Key } from 'lib/types'

export type SumAggregationBody<TDocument extends Document> = {
    field: Key<TDocument>
}

export type SumAggregation<TDocument extends Document> = {
    sum: SumAggregationBody<TDocument>
}

export const getSumAggregation = <TDocument extends Document>(field: Key<TDocument>): SumAggregation<TDocument> => ({
    sum: { field }
})
