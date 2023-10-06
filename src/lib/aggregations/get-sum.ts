import { Document, Field } from 'lib/types'

type SumAggregationBody<TDocument extends Document> = {
    field: Field<TDocument>
}

export type SumAggregationReturnType<TDocument extends Document> = {
    sum: SumAggregationBody<TDocument>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getSumAggregation = <TDocument extends Document>(field: Field<TDocument>): SumAggregationReturnType<TDocument> => ({
    sum: { field }
})
