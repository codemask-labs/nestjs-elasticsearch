import { Document, Field } from 'lib/types'

export type AvgAggregationBody<TDocument extends Document> = {
    field: Field<TDocument>
}

export type AvgAggregation<TDocument extends Document> = {
    avg: AvgAggregationBody<TDocument>
}

export const getAvgAggregation = <TDocument extends Document>(field: Field<TDocument>): AvgAggregation<TDocument> => ({
    avg: { field }
})
