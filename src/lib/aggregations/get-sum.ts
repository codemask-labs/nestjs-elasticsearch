import { Document, Field, Key } from 'lib/types'

export type SumAggregationBody<TDocument extends Document> = {
    field: Key<TDocument>
}

export type SumAggregation<TDocument extends Document> = {
    sum: SumAggregationBody<TDocument>
}

export const getSumAggregation = <TDocument extends Document, TField extends Field<TDocument> = Field<TDocument>>(field: TField): SumAggregation<TDocument> => ({
    sum: { field } as SumAggregationBody<TDocument>
})
