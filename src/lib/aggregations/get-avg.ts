import { Document, Field } from 'lib/types'

export type AvgAggregationBody<TDocument extends Document> = {
    field: Field<TDocument>
}

export type AvgAggregation<TDocument extends Document> = {
    avg: AvgAggregationBody<TDocument>
}

export const getAvgAggregation = <TDocument extends Document, TField extends Field<TDocument> = Field<TDocument>>(
    field: TField
): AvgAggregation<TDocument> => ({
    avg: { field }
})
