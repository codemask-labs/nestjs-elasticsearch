import { Document, NumericField } from 'lib/common'

export type AvgAggregationBody<TDocument extends Document> = {
    field: NumericField<TDocument>
}

export type AvgAggregation<TDocument extends Document> = {
    avg: AvgAggregationBody<TDocument>
}

export const getAvgAggregation = <TDocument extends Document>(field: NumericField<TDocument>): AvgAggregation<TDocument> => ({
    avg: { field },
})
