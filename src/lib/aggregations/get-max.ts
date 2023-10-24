import { is } from 'ramda'
import { Document, Field } from 'lib/common'

export type MaxAggregationScript = {
    script: string
}

export type MaxAggregationField<TDocument extends Document> = {
    field: Field<TDocument>
}

export type MaxAggregation<TDocument extends Document> = {
    max: MaxAggregationField<TDocument> | MaxAggregationScript
}

export const getMaxAggregation = <TDocument extends Document>(fieldOrScript: Field<TDocument> | MaxAggregationScript): MaxAggregation<TDocument> => {
    if (!is(String, fieldOrScript)) {
        return { max: fieldOrScript }
    }

    return {
        max: { field: fieldOrScript }
    }
}
