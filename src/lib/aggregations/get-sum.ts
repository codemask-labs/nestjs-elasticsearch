import { has } from 'ramda'
import { Document, Field } from 'lib/common'

export type SumAggregationScript = {
    script: string
}

export type SumAggregationField<TDocument extends Document> = {
    field: Field<TDocument>
}

export type SumAggregationBody<TDocument extends Document> = SumAggregationField<TDocument> | SumAggregationScript

export type SumAggregation<TDocument extends Document> = {
    sum: SumAggregationBody<TDocument>
}

export const getSumAggregation = <TDocument extends Document>(fieldOrScript: Field<TDocument> | SumAggregationScript): SumAggregation<TDocument> => {
    if (has('script', fieldOrScript)) {
        const { script } = fieldOrScript

        return {
            sum: { script }
        }
    }

    return {
        sum: { field: fieldOrScript }
    }
}
