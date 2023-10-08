import { Document, Field } from 'lib/types'

export type SumAggregationBody<TDocument extends Document> = {
    field: Field<TDocument>
}

export type SumAggregation<TDocument extends Document> = {
    sum: SumAggregationBody<TDocument>
}

export const getSumAggregation = <TDocument extends Document>(field: Field<TDocument>): SumAggregation<TDocument> => ({
    sum: { field }
})
