import { Document } from 'lib/common'

type NumericField<TDocument extends Document> = {
    [K in keyof TDocument]: Exclude<TDocument[K], undefined> extends number ? K : never
}[keyof TDocument]

export type AvgAggregationBody<TDocument extends Document> = {
    field: NumericField<TDocument>
}

export type AvgAggregation<TDocument extends Document> = {
    avg: AvgAggregationBody<TDocument>
}

export const getAvgAggregation = <TDocument extends Document>(field: NumericField<TDocument>): AvgAggregation<TDocument> => ({
    avg: { field }
})
