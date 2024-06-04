import { is } from 'ramda'
import { Document, NumericField } from 'lib/common'

export type SumAggregationScript = {
    script: string
}

export type SumAggregationField<TDocument extends Document> = {
    field: NumericField<TDocument>
}

export type SumAggregation<TDocument extends Document> = {
    sum: SumAggregationField<TDocument> | SumAggregationScript
}

export const getSumAggregation = <TDocument extends Document>(
    fieldOrScript: NumericField<TDocument> | SumAggregationScript
): SumAggregation<TDocument> => {
    if (is(String, fieldOrScript) || is(Symbol, fieldOrScript) || is(Number, fieldOrScript)) {
        return { sum: { field: fieldOrScript } }
    }

    return {
        sum: fieldOrScript
    }
}
