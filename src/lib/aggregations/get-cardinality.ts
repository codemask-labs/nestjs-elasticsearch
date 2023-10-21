import { Document, Field } from 'lib/common'

export type CardinalityAggregationBody<TDocument extends Document> = {
    field: Field<TDocument>
}

export type CardinalityAggregation<TDocument extends Document> = {
    cardinality: CardinalityAggregationBody<TDocument>
}

export const getCardinalityAggregation = <TDocument extends Document>(field: Field<TDocument>): CardinalityAggregation<TDocument> => ({
    cardinality: { field }
})
