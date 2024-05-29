import { is } from 'ramda'
import { Document, Field } from 'lib/common'

export type CardinalityAggregationOptions = {
    /**
     * @description The default value is 3000. The maximum supported value is 40000, thresholds above this number will have the same effect as a threshold of 40000.
     */
    precision_threshold?: number
}

export type CardinalityField<TDocument extends Document> = {
    field: Field<TDocument>
    precision_threshold?: number
}

export type CardinalityScript = {
    script: string
}

export type CardinalityAggregationBody<TDocument extends Document> = CardinalityField<TDocument> | CardinalityScript

export type CardinalityAggregation<TDocument extends Document> = {
    cardinality: CardinalityAggregationBody<TDocument>
}

export const getCardinalityAggregation = <TDocument extends Document>(
    fieldOrScript: Field<TDocument> | CardinalityScript,
    options?: CardinalityAggregationOptions
): CardinalityAggregation<TDocument> => {
    if (!is(String, fieldOrScript)) {
        return { cardinality: fieldOrScript }
    }

    return {
        cardinality: { field: fieldOrScript, ...options }
    }
}
