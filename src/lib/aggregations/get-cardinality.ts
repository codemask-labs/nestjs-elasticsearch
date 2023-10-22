import { Document, Field } from 'lib/common'

export type CardinalityFieldAggregation<TDocument extends Document> = {
    field: Field<TDocument>
}

export type CardinalityScriptAggregation = {
    script: string
}

export type CardinalityAggregation<TDocument extends Document> = {
    cardinality: CardinalityFieldAggregation<TDocument> | CardinalityScriptAggregation
}

export const getCardinalityAggregation = <TDocument extends Document>(field: Field<TDocument>): CardinalityAggregation<TDocument> => ({
    cardinality: { field }
})
