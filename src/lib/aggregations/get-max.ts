import { is } from 'ramda'
import { Document, NumericField } from 'lib/common'

export type MaxAggregationScript = {
    script: string
}

export type MaxAggregationField<TDocument extends Document> = {
    field: NumericField<TDocument>
}

export type MaxAggregation<TDocument extends Document> = {
    max: MaxAggregationField<TDocument> | MaxAggregationScript
}

export const getMaxAggregation = <TDocument extends Document>(
    fieldOrScript: NumericField<TDocument> | MaxAggregationScript,
): MaxAggregation<TDocument> => {
    if (is(String, fieldOrScript) || is(Symbol, fieldOrScript) || is(Number, fieldOrScript)) {
        return { max: { field: fieldOrScript } }
    }

    return {
        max: fieldOrScript,
    }
}
