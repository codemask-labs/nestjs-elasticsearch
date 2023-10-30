import { is } from 'ramda'
import { Document, Field } from 'lib/common'

export type MinAggregationScript = {
    script: string
}

export type MinAggregationField<TDocument extends Document> = {
    field: Field<TDocument>
}

export type MinAggregation<TDocument extends Document> = {
    min: MinAggregationField<TDocument> | MinAggregationScript
}

export const getMinAggregation = <TDocument extends Document>(fieldOrScript: Field<TDocument> | MinAggregationScript): MinAggregation<TDocument> => {
    if (!is(String, fieldOrScript)) {
        return { min: fieldOrScript }
    }

    return {
        min: { field: fieldOrScript }
    }
}
