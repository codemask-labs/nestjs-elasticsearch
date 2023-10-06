import { Document, Field } from 'lib/types'

type AvgAggregationBody<TDocument extends Document> = {
    field: Field<TDocument>
}

export type AvgAggregationReturnType<TDocument extends Document> = {
    avg: AvgAggregationBody<TDocument>
}

export const getAvgAggregation = <TDocument extends Document>(field: Field<TDocument>): AvgAggregationReturnType<TDocument> => ({
    avg: { field }
})
