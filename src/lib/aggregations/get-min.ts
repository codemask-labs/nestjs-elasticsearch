import { is } from 'ramda'
import { Document, NumericField } from 'lib/common'

export type MinAggregationScript = {
    script: string
}

export type MinAggregationField<TDocument extends Document> = {
    field: NumericField<TDocument>
}

export type MinAggregation<TDocument extends Document> = {
    min: MinAggregationField<TDocument> | MinAggregationScript
}

export const getMinAggregation = <TDocument extends Document>(
    fieldOrScript: NumericField<TDocument> | MinAggregationScript
): MinAggregation<TDocument> => {
    if (is(String, fieldOrScript) || is(Symbol, fieldOrScript) || is(Number, fieldOrScript)) {
        return { min: { field: fieldOrScript } }
    }

    return {
        min: fieldOrScript
    }
}
